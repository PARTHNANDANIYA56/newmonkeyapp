
import React from 'react';

function Newsitem(props) {
  const { title, description, urlToImage, url } = props;
  return (
    <>
      <div className='card my-3'>
        {urlToImage && (
          <img
          // src={!urlToImage ? "https://www.marketingguerrilla.es/wp-content/uploads/2023/12/feliz-2024-650x433.jpg" : urlToImage}
          src={urlToImage}
          className='card-img-top'
            alt={title}
            style={{ maxHeight: '200px' }}
          />
        )}
        <div className='card-body'>
          <h5 className='card-title'>{title}</h5>
          <p className='card-text'>{description}</p>
          <a href={url} target='_blank' rel='noopener noreferrer' className='btn btn-primary'>
            Read more
          </a>
        </div>
      </div>
    </>
  )

}

export default Newsitem;
