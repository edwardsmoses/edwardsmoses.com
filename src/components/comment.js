import {useRef, useEffect} from 'react'
import React from 'react';
import { useStaticQuery, graphql } from 'gatsby'

export const Comment = ({commentBox}) => (<div ref={commentBox} className="comments"></div>)
