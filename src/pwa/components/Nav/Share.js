/* eslint-disable jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events */
import React from 'react';
import PropTypes from 'prop-types';
import { inject } from 'mobx-react';
import styled from 'react-emotion';
import {
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';
import EmailIcon from 'react-icons/lib/fa/envelope-o';
import FacebookIcon from 'react-icons/lib/fa/facebook';
import TwitterIcon from 'react-icons/lib/fa/twitter';
import WhatsappIcon from 'react-icons/lib/fa/whatsapp';

const Share = ({ link, title }) => (
  <Container>
    <StyledFacebookShareButton url={link} quote={title}>
      <FacebookIcon size={28} />
    </StyledFacebookShareButton>
    <StyledTwitterShareButton url={link} title={title}>
      <TwitterIcon size={30} />
    </StyledTwitterShareButton>
    <StyledWhatsappShareButton url={link} title={title}>
      <WhatsappIcon size={30} />
    </StyledWhatsappShareButton>
    <StyledEmailShareButton url={link} subject={title} body={`${title}\n${link}`}>
      <EmailIcon size={28} />
    </StyledEmailShareButton>
  </Container>
);

Share.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default inject(({ connection }) => ({
  title: connection.selectedItem.entity.title,
  link: connection.selectedItem.entity.link,
}))(Share);

const Container = styled.div`
  box-sizing: border-box;
  width: auto;
  display: flex;
  height: ${({ theme }) => theme.size.button};

  & > div {
    margin: 5px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    width: 44px;
    border-radius: 50%;
  }
`;

const StyledFacebookShareButton = styled(FacebookShareButton)`
  background-color: ${({ theme }) => theme.color.facebook};
`;

const StyledTwitterShareButton = styled(TwitterShareButton)`
  background-color: ${({ theme }) => theme.color.twitter};
`;

const StyledWhatsappShareButton = styled(WhatsappShareButton)`
  background-color: ${({ theme }) => theme.color.whatsapp};
`;

const StyledEmailShareButton = styled(EmailShareButton)`
  background-color: ${({ theme }) => theme.color.email};
`;
