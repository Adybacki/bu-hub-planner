import './App.css';
import React from 'react';
import { useState } from 'react';

function App() {

  const [hubs, setHubs] = useState({
    plm: 0,
    aex: 0,
    hco : 0,
    siI : 0,
    soI : 0,
    sisoII : 0,
    qrI : 0,
    qrII : 0,
    iic : 0,
    gci : 0,
    etr : 0,
    fyw : 0,
    wri : 0,
    win : 0,
    osc : 0,
    dme : 0,
    crt : 0,
    ril : 0,
    twc : 0,
    cri : 0
  });

  const requiredValues = {
    plm: 1,
    aex: 1,
    hco: 1,
    siI: 1,
    soI: 1,
    sisoII: 1,
    qrI: 1,
    qrII: 1,
    iic: 1,
    gci: 2,
    etr: 1,
    fyw: 1,
    wri: 1,
    win: 2,
    osc: 1,
    dme: 1,
    crt: 2,
    ril: 2,
    twc: 2,
    cri: 2
  };

  const [className, setClassName] = useState('');
  const [selectedHubs, setSelectedHubs] = useState([]);

  const handleCheckboxChange = (event) => {
    const checkbox = event.target;
    const hub = checkbox.id.replace('CB', '');
      if (checkbox.checked) {
        setSelectedHubs([...selectedHubs, hub]);
      } else {
        setSelectedHubs(selectedHubs.filter(item => item !== hub));
      }
  };
  
  const updateCounters = () => {
    setHubs(prevHubs => {
      const updatedHubs = { ...prevHubs };
      selectedHubs.forEach(hub => {
        updatedHubs[hub] = prevHubs[hub] + 1;
      });
      return updatedHubs;
    });
  };

  const handleAddClass = () => {
    let newClassName = document.getElementById("className").value;
    if (newClassName === undefined || newClassName === '') {
      alert("Please provide a course name");
  }
  else {
      setClassName(newClassName);
      selectedHubs.forEach(hub => {
        let label = document.getElementById(hub + "CL");
        label.textContent = `${label.textContent ? label.textContent + ', ' : ''}${newClassName}`;
        if (hubs[hub] + 1 >= requiredValues[hub]) {
            let box = document.getElementById(hub + "BOX");
            box.style.backgroundColor = "rgb(1, 64, 1)";
        }
      });
      updateCounters();
      resetInputs();
  }
  };

  const resetInputs = () => {
    const updatedHubs = { ...hubs };
    for (let hub in updatedHubs) {
      let check = hub + "CB";
      let checkbox = document.getElementById(check);
      if (checkbox) {
        checkbox.checked = false;
      }
    }
    updateCounters();
    document.getElementById("className").value = '';
    setSelectedHubs([]);
  };

  const handleReset = () => {
    const isConfirmed = window.confirm("Are you sure you want to reset? This will clear everything.");
    if (isConfirmed) {
    const updatedHubs = {};
    for (let hub in hubs) {
      updatedHubs[hub] = 0;
      let box = document.getElementById(hub + "BOX");
            box.style.backgroundColor = "rgb(31 41 55)";
    }
    setHubs(updatedHubs);
    Object.keys(hubs).forEach(hub => {
        let label = document.getElementById(hub + "CL");
        label.textContent = '';
      });
    resetInputs();
  };
}

  return (
    <div className="App">
      <header className="App-header">
        <h1 class="text-4xl font-bold">Boston University HUB Credit Planner</h1>
        <div class="flex">
            <a href="https://www.bu.edu/academics/search/" target="_blank" rel="noreferrer" class="text-sm text-blue-500 hover:underline px-1">BU Course Search</a>         
            <a href="https://www.bu.edu/hub/" target="_blank" rel="noreferrer" class="text-sm text-blue-500 hover:underline px-1">BU HUB Page</a>
        </div>
      </header>

<div class="relative overflow-x-auto shadow-md sm:rounded-lg">
   
<div class="main-table">
            
            <div class="flex justify-center relative mt-1 py-2 space-x-2">
                <input 
                  type="text" 
                  id="className"
                  class="block pt-2 pb-2 ps-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Class Name"></input>
                <button 
                  onClick={handleAddClass} 
                  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Class
                </button>
                <button onClick={handleReset} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    Reset
                </button>
    </div>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                    
                </th>
                <th scope="col" class="px-6 py-3 w-25">
                    PHILOSOPHICAL, AESTHETIC, AND HISTORICAL INTERPRETATION
                </th>
                <th scope="col" class="px-6 py-3">
                    Classes
                </th>
            </tr>
        </thead>
        <tbody>
            <tr id="plmBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="plmCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="plmCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Philosophical Inquiry and Life’s Meanings (1 requirement)
                </th>
                <td id="plmCL" class="px-6 py-4">
                </td>
            </tr>
            <tr id="aexBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="aexCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="aexCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Aesthetic Exploration (1 requirement)
                </th>
                <td id="aexCL" class="px-6 py-4">
                </td>
            </tr>
            <tr id="hcoBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="hcoCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="hcoCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  Historical Consciousness (1 requirement)
                </th>
                <td id="hcoCL" class="px-6 py-4">
                </td>
            </tr>
            
        </tbody>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                </th>
                <th scope="col" class="px-6 py-3">
                SCIENTIFIC AND SOCIAL INQUIRY
                </th>
                <th scope="col" class="px-6 py-3">
                Classes
                </th>
            </tr>
        </thead>
        <tbody>
            <tr id="siIBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="siICB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="siICB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Scientific Inquiry I (1 requirement)
                </th>
                <td id="siICL" class="px-6 py-4">
                </td>
            </tr>
            <tr id="soIBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="soICB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="soICB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Social Inquiry I (1 requirement)
                </th>
                <td id="soICL" class="px-6 py-4">
                </td>
            </tr>
            <tr id="sisoIIBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="sisoIICB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="sisoIICB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Scientific Inquiry II or Social Inquiry II (1 requirement)
                </th>
                <td id="sisoIICL" class="px-6 py-4">
                </td>
            </tr>
            
        </tbody>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                </th>
                <th scope="col" class="px-6 py-3">
                QUANTITATIVE REASONING
                </th>
                <th scope="col" class="px-6 py-3">
                Classes
                </th>
            </tr>
        </thead>
        <tbody>
            <tr id="qrIBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="qrICB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="qrICB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Quantitative Reasoning I (1 requirement)
                </th>
                <td id="qrICL" class="px-6 py-4">
                </td>
            </tr>
            <tr id="qrIIBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="qrIICB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="qrIICB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Quantitative Reasoning II (1 requirement)
                </th>
                <td id="qrIICL" class="px-6 py-4">
                </td>
            </tr> 
        </tbody>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                </th>
                <th scope="col" class="px-6 py-3">
                DIVERSITY, CIVIC ENGAGEMENT, AND GLOBAL CITIZENSHIP
                </th>
                <th scope="col" class="px-6 py-3">
                Classes
                </th>
            </tr>
        </thead>
        <tbody>
            <tr id="iicBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="iicCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="iicCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                The Individual in Community (1 requirement)
                </th>
                <td id="iicCL" class="px-6 py-4">
                </td>
            </tr>
            <tr id="gciBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="gciCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="gciCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Global Citizenship and Intercultural Literacy (2 requirements)
                </th>
                <td id="gciCL" class="px-6 py-4">
                </td>
            </tr> 
            <tr id="etrBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="etrCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="etrCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Ethical Reasoning (1 requirement)
                </th>
                <td id="etrCL" class="px-6 py-4">
                </td>
            </tr> 
        </tbody>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                </th>
                <th scope="col" class="px-6 py-3">
                COMMUNICATION
                </th>
                <th scope="col" class="px-6 py-3">
                Classes
                </th>
            </tr>
        </thead>
        <tbody>
            <tr id="fywBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="fywCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="fywCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                First-Year Writing Seminar (1 requirement)
                </th>
                <td id="fywCL" class="px-6 py-4">
                </td>
            </tr>
            <tr id="wriBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="wriCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="wriCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Writing, Research, and Inquiry (1 requirement)
                </th>
                <td id="wriCL" class="px-6 py-4">
                </td>
            </tr> 
            <tr id="winBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="winCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="winCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Writing-Intensive Course (2 requirements)
                </th>
                <td id="winCL" class="px-6 py-4">
                </td>
            </tr> 
            <tr id="oscBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="oscCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="oscCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Oral and/or Signed Communication (1 requirement)
                </th>
                <td id="oscCL" class="px-6 py-4">
                </td>
            </tr> 
            <tr id="dmeBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="dmeCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="dmeCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Digital/Multimedia Expression (1 requirement)
                </th>
                <td id="dmeCL" class="px-6 py-4">
                </td>
            </tr> 
        </tbody>
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="p-4">
                </th>
                <th scope="col" class="px-6 py-3">
                INTELLECTUAL TOOLKIT
                </th>
                <th scope="col" class="px-6 py-3">
                Classes
                </th>
            </tr>
        </thead>
        <tbody>
            <tr id="crtBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="crtCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="crtCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Critical Thinking (2 requirements)
                </th>
                <td id="crtCL" class="px-6 py-4">
                </td>
            </tr>
            <tr id="rilBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="rilCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="rilCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Research and Information Literacy (2 requirements)
                </th>
                <td id="rilCL" class="px-6 py-4">
                </td>
            </tr> 
            <tr id="twcBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="twcCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="twcCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Teamwork/Collaboration (2 requirements)
                </th>
                <td id="twcCL" class="px-6 py-4">
                </td>
            </tr> 
            <tr id="criBOX" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td class="w-4 p-4">
                    <div class="flex items-center">
                        <input id="criCB" type="checkbox" onChange={handleCheckboxChange} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                        <label for="criCB" class="sr-only">checkbox</label>
                    </div>
                </td>
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                Creativity/Innovation (2 requirements)
                </th>
                <td id="criCL" class="px-6 py-4">
                </td>
            </tr> 
        </tbody>
    </table>
    </div>
</div>
    </div>
  );
}

export default App;

