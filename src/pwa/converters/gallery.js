import React from 'react';
import Gallery from '../components/Gallery';

export default {
  test: ({ tagName, attributes }) =>
    tagName === 'div' && attributes && attributes.id && /(^|\s)gallery-\d+/.test(attributes.id),
  converter: element => {
    const getMediaAttributes = ({ children = [], tagName, attributes }) => {
      if (tagName === 'img') {
        const { alt, sizes, src, srcset, dataset } = attributes;
        const { attachmentId } = dataset || {};
        return [{ attachmentId: parseInt(attachmentId, 10), alt, sizes, src, srcset }];
      }
      return children.reduce((all, child) => all.concat(getMediaAttributes(child)), []);
    };

    const mediaAttributes = getMediaAttributes(element);
    const useIds = !mediaAttributes.find(({ attachmentId }) => !attachmentId);

    return <Gallery useIds={useIds} mediaAttributes={mediaAttributes} />;
  },
};
