import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_TOURS } from '../graphql/queries';
import { Link, useNavigate, useParams } from 'react-router-dom';

function TourList() {
  const { page } = useParams();
  const navigate = useNavigate();

  const itemsPerPage = 2;
  const [currentPage, setCurrentPage] = useState(Number(page) || 1);
  const [after, setAfter] = useState(null);
  const [cursors, setCursors] = useState([null]);

  const { loading, error, data } = useQuery(GET_TOURS, {
    variables: { first: itemsPerPage, after },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (page) {
      setCurrentPage(Number(page));
    }
  }, [page]);

  useEffect(() => {
    if (currentPage > 1 && cursors[currentPage - 1]) {
      setAfter(cursors[currentPage - 1]);
    } else {
      setAfter(null);  // Ensure 'after' is reset when going back to the first page
    }
  }, [currentPage, cursors]);

  useEffect(() => {
    if (data && data.tours && data.tours.pageInfo && data.tours.pageInfo.endCursor) {
      // Prevent unnecessary updates to avoid re-render
      if (cursors[currentPage] !== data.tours.pageInfo.endCursor) {
        const newCursors = [...cursors];
        newCursors[currentPage] = data.tours.pageInfo.endCursor;
        setCursors(newCursors);
      }
    }
  }, [data, currentPage, cursors]);

  console.log('Current Page:', currentPage);
  console.log('After Cursor:', after);
  console.log('GraphQL Data:', data);
  console.log('Cursors:', cursors);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data || !data.tours) return <p>No data available</p>;

  const totalPages = Math.ceil((data.tours.nodes.length || 0) / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    navigate(`/page/${pageNumber}`);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (data.tours.pageInfo.hasNextPage) {
      handlePageChange(currentPage + 1);
      setAfter(data.tours.pageInfo.endCursor);
    }
  };

  return (
    <div className="tours-container">
      <div className="row">
        {data.tours.nodes.map((tour) => (
          <div className="col-sm-3" key={tour.id}>
            <div className="card">
              <h2>{tour.title}</h2>
              {tour.featuredImage && (
                <img src={tour.featuredImage.node.sourceUrl} alt={tour.title} />
              )}
              <p>Price: {tour.acftours?.tourPrice || 'Not available'}</p>
              <p>Location: {tour.acftours?.tourLocation || 'Not available'}</p>
              {tour.excerpt && (
                <div
                  dangerouslySetInnerHTML={{ __html: tour.excerpt }}
                />
              )}
              <Link to={`/tour/${tour.slug}`}>Read More</Link>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination" style={{ textAlign: 'center', marginTop: '20px' }}>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? 'active' : ''}
          >
            {index + 1}
          </button>
        ))}

        <button onClick={handleNextPage} disabled={!data.tours.pageInfo.hasNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default TourList;
