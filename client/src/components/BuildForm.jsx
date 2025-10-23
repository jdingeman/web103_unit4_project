import React, { useState, useEffect } from "react";
import "../css/CreateBuild.css";
import PartsAPI from "../services/PartsAPI";
import { calcTotal } from "../utilities/calcprice";

const BuildForm = ({ initialData, onSubmit, mode = "create" }) => {
  const tabs = [
    { id: "cases", label: "Case" },
    { id: "cpus", label: "CPU" },
    { id: "gpus", label: "GPU" },
    { id: "motherboards", label: "Motherboard" },
    { id: "rams", label: "RAM" },
    { id: "storages", label: "Storage" },
    { id: "your-build", label: "Your Build" },
  ];

  const [selectedTab, setSelectedTab] = useState(tabs[0].id);
  const [options, setOptions] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [fetchedOptions, setFetchedOptions] = useState({});
  const [buildData, setBuildData] = useState(initialData);

  const total = calcTotal(selectedOptions, fetchedOptions);

  // Fetch parts for the current tab
  useEffect(() => {
    const fetchOptions = async () => {
      if (selectedTab !== "your-build") {
        const tabOptions = await PartsAPI.getPartsByTable(selectedTab);
        setOptions(tabOptions);
        setFetchedOptions((prev) => ({ ...prev, [selectedTab]: tabOptions }));
      }
    };
    fetchOptions();
  }, [selectedTab]);

  // Preselect parts if editing
  useEffect(() => {
    if (initialData && Object.keys(initialData).length > 0) {
      const preselected = {};
      for (let tab of tabs) {
        const key = `${tab.id.slice(0, -1)}_id`;
        if (initialData[key]) preselected[tab.id] = initialData[key];
      }
      setSelectedOptions(preselected);
    }
  }, [initialData]);

  const toggleOption = (category, optionId) => {
    setSelectedOptions((prev) => {
      const newSelection = {
        ...prev,
        [category]: prev[category] === optionId ? null : optionId,
      };

      setBuildData((prevBuild) => ({
        ...prevBuild,
        [`${category.slice(0, -1)}_id`]: newSelection[category] || null,
      }));

      return newSelection;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalBuild = { ...buildData, price: total };
    onSubmit(finalBuild);
  };

  const yourBuild = Object.entries(selectedOptions)
    .filter(([_, optionId]) => !!optionId)
    .map(([tabId, optionId]) => {
      const option = fetchedOptions[tabId]?.find((o) => o.id === optionId);
      return option ? { tab: tabId, ...option } : null;
    })
    .filter(Boolean);

  return (
    <div>
      <form className="tabs-container" onSubmit={handleSubmit}>
        <aside className="tabs-sidebar">
          <h2 className="tabs-title">Components</h2>
          <ul className="tabs-list">
            {tabs
              .filter((t) => t.id !== "your-build")
              .map((tab) => (
                <li
                  key={tab.id}
                  className={`tab-item ${
                    selectedTab === tab.id ? "active-tab" : ""
                  }`}
                  onClick={() => setSelectedTab(tab.id)}
                >
                  {tab.label}
                </li>
              ))}
          </ul>
          <div className="your-build-tab">
            <li
              className={`tab-item ${
                selectedTab === "your-build" ? "active-tab" : ""
              }`}
              onClick={() => setSelectedTab("your-build")}
            >
              Your Build
            </li>
          </div>
          <div className="total-price">
            <p>Total: ${total.toFixed(2)}</p>
          </div>
        </aside>

        <section className="options-section">
          <h2 className="options-title">
            {tabs.find((t) => t.id === selectedTab)?.label ||
              (selectedTab === "your-build" && "Your Build")}
          </h2>
          {selectedTab !== "your-build" ? (
            <div className="options-grid">
              {options.map((option) => {
                const isSelected = selectedOptions[selectedTab] === option.id;
                return (
                  <div
                    key={option.id}
                    className={`option-card ${isSelected ? "selected" : ""}`}
                    onClick={() => toggleOption(selectedTab, option.id)}
                  >
                    <h4>{option.name}</h4>
                    {option.price && <p>${option.price}</p>}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="your-build-summary">
              {yourBuild.length > 0 ? (
                <ul>
                  {yourBuild.map((item) => (
                    <li key={`${item.tab}-${item.id}`}>
                      <strong>{item.tab.toUpperCase().slice(0, -1)}: </strong>{" "}
                      {item.name} (${item.price})
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No components selected yet.</p>
              )}
            </div>
          )}

          {selectedTab === "your-build" && (
            <div className="your-build-footer">
              <div className="build-name-input">
                <label htmlFor="build-name">
                  {mode === "edit"
                    ? "Edit build name:"
                    : "Name of your new build:"}
                </label>
                <input
                  type="text"
                  required
                  id="build-name"
                  name="build-name"
                  placeholder="Enter a build name"
                  value={buildData.name || ""}
                  onChange={(e) =>
                    setBuildData((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                />
              </div>

              <button type="submit" className="submit-button">
                {mode === "edit" ? "Save Changes" : "Submit Build"}
              </button>
            </div>
          )}
        </section>
      </form>
    </div>
  );
};

export default BuildForm;
