const initialState = {
  createPost: false,
  search_contents: "",
  titleWarningMessage: null,
  contentsWarningMessage: null,
};
  
// action types
export const types = {
  CREATE_POST_SUCCESS: "CREATE_POST_SUCCESS",
  CANCEL_POST_SUCCESS: "CANCEL_POST_SUCCESS",
  SAVE_POST_SUCCESS: "SAVE_POST_SUCCESS",
  SAVE_POST_ERROR: "SAVE_POST_ERROR",

  UPDATE_SUCCESS: "UPDATE_SUCCESS",
  UPDATE_ERROR: "UPDATE_ERROR",

  SEARCH_SUCCESS: "SEARCH_SUCCESS",

  TITLE_FORMAT_CORRECT: "TITLE_FORMAT_CORRECT",
  TITLE_FORMAT_WRONG: "TITLE_FORMAT_WRONG",
  CONTENTS_FORMAT_CORRECT: "CONTENTS_FORMAT_CORRECT",
  CONTENTS_FORMAT_WRONG: "CONTENTS_FORMAT_WRONG",

  CLOSE_WARNING_MESSAGE_SUCCESS: "CLOSE_WARNING_MESSAGE_SUCCESS",
};

// action creators
export const actions = {
  newPost: () => {
    return (dispatch) => {
      dispatch({ type: types.CREATE_POST_SUCCESS });
    }
  },
  cancelPost: () => {
    return (dispatch) => {
      dispatch({ type: types.CANCEL_POST_SUCCESS });
    }
  },
  savePost: (title, contents, username, userid) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('posts').add({
        title: title,
        contents: contents,
        author: username,
        authorid: userid,
        date: new Date(), 
        upvote: 0, 
        downvote: 0,
      }).then(() => {
        dispatch({ type: types.SAVE_POST_SUCCESS });
      }).catch(err => {
        dispatch({ type: types.SAVE_POST_ERROR }, err);
      });
    }
  },
  upvote: (upvote, postid) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('posts').doc(postid).update({
        upvote: ++ upvote,
      }).then(() => {
        dispatch({ type: types.UPDATE_SUCCESS});
      }).catch((err) => {
        dispatch({ type: types.UPDATE_ERROR, err });
      })
    }
  },
  downvote: (downvote, postid) => {
    return (dispatch, getState, {getFirestore}) => {
      const firestore = getFirestore();
      firestore.collection('posts').doc(postid).update({
        downvote: ++ downvote,
      }).then(() => {
        dispatch({ type: types.UPDATE_SUCCESS});
      }).catch((err) => {
        dispatch({ type: types.UPDATE_ERROR, err });
      })
    }
  },
  search: (contents) => {
    return (dispatch) => {
      dispatch({ type: types.SEARCH_SUCCESS, search_contents: contents });
    }
  },
  checkTitle: (title) => {
    return (dispatch) => {
      if (title.length === 0){
        dispatch({ type: types.TITLE_FORMAT_WRONG, titleWarningMessage: "Title is required" });
      } else {
        dispatch({ type: types.TITLE_FORMAT_CORRECT, titleWarningMessage: null });
      }
    }
  },
  checkContents: (contents) => {
    return (dispatch) => {
      if (contents.length === 0){
        dispatch({ type: types.CONTENTS_FORMAT_WRONG, contentsWarningMessage: "Contents is required" });
      } else {
        dispatch({ type: types.CONTENTS_FORMAT_CORRECT, contentsWarningMessage: null });
      }
    }
  },
  closeWarningMessage: () => {
    return (dispatch) => {
      dispatch({ type: types.CLOSE_WARNING_MESSAGE_SUCCESS});
    }
  }
};

// reducers
const reducer = (state = initialState, action) => {
  switch(action.type){
    case types.CREATE_POST_SUCCESS:
      return {...state, createPost: true};
    case types.CANCEL_POST_SUCCESS:
      return {...state, createPost: false};
    case types.SAVE_POST_SUCCESS:
      return state;
    case types.UPDATE_SUCCESS:
      return state;
    case types.UPDATE_ERROR:
      return state;
    case types.SEARCH_SUCCESS:
      return {...state, search_contents: action.search_contents}
    case types.TITLE_FORMAT_WRONG:
      return {...state, titleWarningMessage: action.titleWarningMessage}
    case types.TITLE_FORMAT_CORRECT:
      return {...state, titleWarningMessage: action.titleWarningMessage}
    case types.CONTENTS_FORMAT_WRONG:
      return {...state, contentsWarningMessage: action.contentsWarningMessage}
    case types.CONTENTS_FORMAT_CORRECT:
      return {...state, contentsWarningMessage: action.contentsWarningMessage}
    case types.CLOSE_WARNING_MESSAGE_SUCCESS:
        return {...state, titleWarningMessage: null, contentsWarningMessage: null}
    default: 
      return state;
  }
}

export default reducer;
  