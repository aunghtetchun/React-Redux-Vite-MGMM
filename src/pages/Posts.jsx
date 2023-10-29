import React, { useEffect } from "react";
import { useCallback } from "react";
import { useState } from "react";
import { useRef } from "react";
import { fetchAllPosts } from '../actions/postAction';
import { useDispatch, useSelector } from "react-redux";
import SearchPosts from "../components/SearchPost";
import { Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

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
        <>
          {search_status == 'not_found' ? <h4 className='mt-4'>No Post Found</h4> :''}
          {posts && search_status != 'not_found' ? 
            posts.map((post) => (
              <div
              className="col-12 shadow  card mt-3 col-md-6 col-lg-4 "
              onClick={() => seePost(post.id)}
              key={post.id}
            >
              <div className={post.sold == 1 ? "sold-out-badge shadow" : "instock-badge shadow"} >
                <span>{post.sold == 1 ? "Sold Out" : "Instock"}</span>
              </div>

              <span className="fw-bold post-title p-2 mb-0 text-center bg_post"  >
                {post.title}
              </span>
              <div className="post-card" style={{ backgroundImage: `url(${post.profile})` }}>
                
              </div>
              </div>
            )) : ''}
        </>
      )}
    </>
  );
}
