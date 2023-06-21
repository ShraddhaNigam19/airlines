import React, { useState, useEffect, useRef } from "react";

const LazyLoadingComponent = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const targetRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [loading]);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.instantwebtools.net/v1/passenger?page=${page}&size=10`
      );
      const jsonData = await response.json();
      setData((prevData) => [...prevData, ...jsonData.data]);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="p-4 bg-gray-800 text-white">
          <h1 className="text-2xl font-bold">Passenger List</h1>
          <div className="flex justify-between mt-2">
            <p className="text-sm">
              <span className="font-bold">Total Passengers:</span> {data.length}
            </p>
          </div>
        </div>
        {data.map((item) => (
          <div key={item._id} className="p-4 bg-white shadow my-4">
            <p>
              <span className="font-bold">Name:</span> {item.name}
            </p>
            {item.airline.map((airline) => (
              <div key={airline._id} className="mt-2">
                <p>
                  <span className="font-bold">Airline Name:</span>{" "}
                  {airline.name}
                </p>
                <p>
                  <span className="font-bold">Country:</span> {airline.country}
                </p>
              </div>
            ))}
          </div>
        ))}
        {loading && <div>Loading...</div>}
        <div ref={targetRef} />
      </div>
    </>
  );
};

export default LazyLoadingComponent;
