import React from 'react';
import './Links.css';
const Links = () => {
  return (
    <div className='cons'>
      <div className='links'>
        <a
          href='https://www.teamblind.com/post/New-Year-Gift---Curated-List-of-Top-100-LeetCode-Questions-to-Save-Your-Time-OaM1orEU'
          target='_blank'
          rel='noreferrer'
        >
          Blind 75 Questions
        </a>
      </div>
      <div className='links'>
        <a
          href='https://www.educative.io/courses/grokking-the-coding-interview'
          target='_blank'
          rel='noreferrer'
        >
          Grokking The Coding Interview
        </a>
      </div>
      <div className='links'>
        <a
          href='https://hackernoon.com/14-patterns-to-ace-any-coding-interview-question-c5bb3357f6ed'
          target='_blank'
          rel='noreferrer'
        >
          14 Patterns
        </a>
      </div>
    </div>
  );
};

export default Links;
