import React, { useEffect } from "react";
import { fetchAllPosts } from '../actions/postAction';
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

export default function Posts() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.postReducer.posts);
  const loading = useSelector((state) => state.postReducer.post_loading);
  const search_status = useSelector((state) => state.postReducer.search_status);
  useEffect(() => {
    if (!posts || posts.length === 0 ) {
      dispatch(fetchAllPosts());
    }
  }, [dispatch, posts]);
  const seePost = (id) => {
    navigate(`/posts/${id}`);
  };

  return (
    <>
      {/* <div className="col-12 px-0 ">
        <SearchPosts/>
      </div> */}
      {loading ? (
        <h5>Loading Data...</h5>
      ) : (
        <div className="d-flex justify-content-around flex-wrap col-12 p-0"> 
          <div className="col-12 bg-white stickycard">
              <div className="fw-bold card shadow callcard col-12 px-4 py-2 mb-2 text-center lh mt-3" text="light" >
              <Link to="tel:+959971404793" >
              ဂိမ်းနှင့်ပက်သက်သော ပစ္စည်းများ မိမိစိတ်ကြိုက်စျေးဖြင့် တင်ရောင်းလိုပါက...  <span className="fw-bolder text_main">09971404793</span>  ကိုဆက်သွယ်ပါ... </Link> 
              </div>  
          </div>
                                      
          {search_status == 'not_found' ? <h4 className='mt-4'>No Post Found</h4> :''}
          {posts && search_status != 'not_found' ?            
            posts.map((post) => (
              <div
              className="pcard shadow  card mt-3 "
              onClick={() => seePost(post.id)}
              key={post.id}
            >
              <div className={post.sold == 1 ? "sold-out-badge shadow" : "instock-badge shadow"} >
                <span>{post.sold == 1 ? "Sold Out" : "Instock"}</span>
              </div>

              {/* <span className="fw-bold post-title p-2 mb-0 text-center bg_post"  >
                {post.title}
              </span> */}
              <div className="post-card" style={{ backgroundImage: `url(${post.profile})` }}>
                
              </div>
              </div>
            )) : ''}
        </div>
      )}
    </>
  );
}
