import React from 'react';
import he from 'he';
import Image from '../components/Image';

export default {
  test: element => {
    const { tagName, ignore } = element;
    // Returns false if it's already a lazy component.
    if (ignore) return false;

    // Returns true if element is an <img>.
    if (tagName === 'img') return true;

    // Filters comments out of children.
    return false;
  },
  converter: element => {
    const { attributes } = element;
    const { alt, srcset } = attributes;

    // Return an Image component with id if image has attachedId.
    if (attributes.dataset && attributes.dataset.attachmentId) {
      const attachmentId = parseInt(attributes.dataset.attachmentId, 10);

      return <Image content key={attachmentId} id={attachmentId} />;
    }

    let src;

    // Get src attribute from different cases or assign an empty string.
    if (attributes.src && typeof attributes.src === 'string') {
      ({ src } = attributes);
    } else if (
      attributes.dataset &&
      attributes.dataset.original &&
      typeof attributes.dataset.original === 'string'
    ) {
      src = attributes.dataset.original;
    } else {
      src = '';
    }

    let height;

    // Calculate width and height.
    if (attributes.height && attributes.width) {
      height = `${(attributes.height * 100) / attributes.width}vw`; // prettier-ignore
    } else {
      height = 'auto';
    }

    return (
      <Image
        key={src}
        content
        width="100vw"
        height={height}
        alt={alt}
        src={he.decode(src)}
        srcSet={srcset ? he.decode(srcset) : null}
      />
    );
  },
};
