import React from 'react';
import { PropTypes } from 'prop-types';
import Spinner from '../../common/Spinner/Spinner';
import Alert from '../../common/Alert/Alert';
import HtmlBox from '../../common/HtmlBox/HtmlBox';
import SmallTitle from '../../common/SmallTitle/SmallTitle';
import { withRouter } from 'react-router-dom';
import { FacebookProvider, Comments, ShareButton } from 'react-facebook';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { BASE_URL } from '../../../config';
import './SinglePost.scss';

class SinglePost extends React.Component {
  componentDidMount() {
    const { loadPost, resetRequest, match } = this.props;
    loadPost(match.params.id);
    resetRequest();
  }

  render() {
    const { post, request, location } = this.props;

    if (
      request.pending === false &&
      request.success === true &&
      post !== null
    ) {
      return (
        <article>
          <SmallTitle>{post.title}</SmallTitle>
          <FacebookProvider appId='437479826881005'>
            <ShareButton
              className='fb-share-button'
              href={`${BASE_URL}${location.pathname}`}
            >
              <FontAwesomeIcon icon={faFacebookSquare} className='fb-icon' />
              Share on Facebook
            </ShareButton>
          </FacebookProvider>
          <p>Author: {post.author}</p>
          <HtmlBox>{post.content}</HtmlBox>
          <FacebookProvider appId='437479826881005'>
            <Comments href={`${BASE_URL}${location.pathname}`} />
          </FacebookProvider>
        </article>
      );
    } else if (request.pending === true || request.success === null) {
      return <Spinner />;
    } else if (request.pending === false && request.error !== null) {
      return <Alert variant='error'>{request.error}</Alert>;
    } else if (request.pending === false && request.success === true) {
      return <Alert variant='info'>No posts</Alert>;
    } else {
      return <Alert variant='info'>Something went wrong!</Alert>;
    }
  }
}

SinglePost.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired
    })
  ),
  loadPost: PropTypes.func.isRequired,
  resetRequest: PropTypes.func.isRequired
};

export default withRouter(props => <SinglePost {...props} />);
