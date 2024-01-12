import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkshopSelection = () => {
  const [workshops, setWorkshops] = useState([]);
  const [selectedWorkshops, setSelectedWorkshops] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get("http://localhost:6005/api/workshops");
        setWorkshops(response.data);
      } catch (error) {
        console.error('Error fetching workshops:', error);
      }
    };

    fetchWorkshops();

    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:6005/login/success", { withCredentials: true });

        setUser(response.data.user);
        setSelectedWorkshops(response.data.selectedWorkshops);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleCheckboxChange = (workshopNumber, timing) => {
    // const isTimingClash = selectedWorkshops.some((workshop) => workshop.timing === timing);
    const isTimingClash=selectedWorkshops.timing===timing;

    if (!isTimingClash) {
      setSelectedWorkshops((prevSelected) => [
        ...prevSelected,
        { workshopNumber, timing },
      ]);
    }
  };

  const handleSubmit = async () => {
    try{
      const response = await fetch(`http://localhost:6005/updateUser/${user.id}`,{
        method: 'PATCH',
        body: JSON.stringify(selectedWorkshops),
        headers:{
          'Content-Type':'application/json'
        }
      });
      const json = await response.json();
      console.log("Response json: ", json);
    }catch(error){
      console.error("Error", error);
    }
  };
    // try {
    //   await axios.post("http://localhost:6005/updateUser", {
    //     selectedWorkshops,
    //   }, { withCredentials: true });

    //   console.log('Workshops updated successfully!');
    // } catch (error) {
    //   console.error('Error updating workshops:', error);
    // }
  // };

  return (
    <div>
      <h2>Workshop Selection</h2>
      {workshops.map((workshop) => (
        <div key={workshop.workshopNumber}>
          <label>
            <input
              type="checkbox"
              onChange={() => handleCheckboxChange(workshop.workshopNumber, workshop.timing)}
              checked={selectedWorkshops.some((w) => w.workshopNumber === workshop.workshopNumber)}
            />
            {` Workshop ${workshop.workshopNumber} - ${workshop.timing}`}
          </label>
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
      };

export default WorkshopSelection;
