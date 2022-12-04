import React from 'react';
import Heading from '../layout/Heading';
import SubNav from '../layout/SubNav';
import PostList from "./PostList";
import { Container } from 'react-bootstrap';

function Posts() {
  document.title = "Social Media Company | Posts";

  return (
    <>
    <SubNav />
    <Container className='posts__container'>
    <div className='profile--posts'>
        <Heading title="Latest Posts" />
        <PostList />
    </div>
    </Container>
    </>
  )
}

export default Posts;