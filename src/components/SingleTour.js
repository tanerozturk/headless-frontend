import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOUR_BY_SLUG } from '../graphql/queries';
import { useParams } from 'react-router-dom';

function SingleTour() {
  const { slug } = useParams();
  const { loading, error, data } = useQuery(GET_TOUR_BY_SLUG, {
    variables: { slug },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tour = data.tourBy;

  return (
    <div>
      <h1>{tour.title}</h1>
      {tour.featuredImage && (
        <img src={tour.featuredImage.node.sourceUrl} alt={tour.title} />
      )}
      <div dangerouslySetInnerHTML={{ __html: tour.content }} />
      <p>Price: {tour.acftours?.tourPrice || 'Not available'}</p> {/* Updated to use 'acftours' */}
      <p>Location: {tour.acftours?.tourLocation || 'Not available'}</p> {/* Updated to use 'acftours' */}
      <p>Date: {tour.acftours?.tourDate || 'Not available'}</p> {/* Updated to use 'acftours' */}
      <div dangerouslySetInnerHTML={{ __html: tour.acftours?.tourInformation || '' }} /> {/* Updated to use 'acftours' */}
    </div>
  );
}

export default SingleTour;
