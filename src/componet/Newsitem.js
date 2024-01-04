import React from 'react';

function Newsitem(props) {
  const { title, description, urlToImage, url, publishedAt, author, source } = props;
  return (
    <>
      <div className='card my-3'>
        <div className='batch'>
          <span className='badge rounded-pill bg-danger' style={{ zIndex: '1' }}>{source.name}</span>
        </div>
        {urlToImage && (
          <img
            src={urlToImage}
            className='card-img-top'
            alt={title}
            style={{ maxHeight: '200px' }}
          />
        )}
        <div className='card-body'>
          <h5 className='card-title'>{title.slice(0, 30)}
          </h5>
          {description && (
            <p className='card-text'>{description.substring(70, 0)}...</p>
          )}
          <p className='card-text text-body-secondary'>
            <small>
              By Author {!author ? " unknown " : author} {publishedAt}
            </small>
          </p>
          <a href={url} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
            Read more
          </a>
        </div>
      </div>
    </>
  );
}

export default Newsitem;
