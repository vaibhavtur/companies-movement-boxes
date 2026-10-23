import { useState } from "react";

const initialCompanies = [
  "Raymond",
  "Arvind",
  "Aditya Birla Fashion",
  "Page Industries",
  "Welspun",
  "Bombay Rayon",
  "Donear",
  "Trident",
];

function App() {
  const [availableCompanies, setAvailableCompanies] =
    useState(initialCompanies);
  const [addedCompanies, setAddedCompanies] = useState([]);

  const [selectedAvailable, setSelectedAvailable] = useState("");
  const [selectedAdded, setSelectedAdded] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [newCompany, setNewCompany] = useState("");

  const addCompany = () => {
    const company = newCompany.trim();

    if (!company) return;

    const exists = [...availableCompanies, ...addedCompanies].some(
      (item) => item.toLowerCase() === company.toLowerCase()
    );

    if (exists) {
      alert("This company already exists.");
      return;
    }

    setAvailableCompanies([...availableCompanies, company]);
    setNewCompany("");
    setShowAddForm(false);
  };

  const moveRight = () => {
    if (!selectedAvailable) return;

    setAddedCompanies([...addedCompanies, selectedAvailable]);
    setAvailableCompanies(
      availableCompanies.filter((company) => company !== selectedAvailable)
    );
    setSelectedAvailable("");
  };

  const moveLeft = () => {
    if (!selectedAdded) return;

    setAvailableCompanies([...availableCompanies, selectedAdded]);
    setAddedCompanies(
      addedCompanies.filter((company) => company !== selectedAdded)
    );
    setSelectedAdded("");
  };

  return (
    <div className="page">
      <header className="topbar">
        <div>
          <p className="brand">COMPANY MANAGEMENT</p>
          <h1>Company Management</h1>
          <p className="subtitle">
            Add companies and move them between the two lists.
          </p>
        </div>
      </header>

      <main className="transfer-wrapper">
        {/* LEFT COLUMN */}
        <section className="company-panel">
          <div className="panel-header">
            <div>
              <h2>Available Companies</h2>
              <p>
                {availableCompanies.length}{" "}
                {availableCompanies.length === 1 ? "Company" : "Companies"}
              </p>
            </div>

            <button
              type="button"
              className="add-button"
              onClick={() => setShowAddForm(!showAddForm)}
            >
              + Add Company
            </button>
          </div>

          {showAddForm && (
            <div className="add-form">
              <input
                type="text"
                value={newCompany}
                onChange={(event) => setNewCompany(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") addCompany();
                }}
                placeholder="Enter company name"
                autoFocus
              />

              <div className="form-actions">
                <button type="button" onClick={addCompany}>
                  Add
                </button>
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => {
                    setShowAddForm(false);
                    setNewCompany("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          <div className="company-list">
            {availableCompanies.length === 0 ? (
              <div className="empty-state">No companies available</div>
            ) : (
              availableCompanies.map((company) => (
                <button
                  type="button"
                  key={company}
                  className={`company-item ${
                    selectedAvailable === company ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAvailable(company)}
                >
                  <span className="radio">
                    {selectedAvailable === company && (
                      <span className="radio-dot" />
                    )}
                  </span>
                  <span>{company}</span>
                </button>
              ))
            )}
          </div>
        </section>

        {/* ARROWS */}
        <div className="arrow-controls">
          <button
            type="button"
            className="arrow-button"
            onClick={moveRight}
            disabled={!selectedAvailable}
            aria-label="Move company to added companies"
            title="Move right"
          >
            →
          </button>

          <button
            type="button"
            className="arrow-button"
            onClick={moveLeft}
            disabled={!selectedAdded}
            aria-label="Move company to available companies"
            title="Move left"
          >
            ←
          </button>
        </div>

        {/* RIGHT COLUMN */}
        <section className="company-panel">
          <div className="panel-header">
            <div>
              <h2>Added Companies</h2>
              <p>
                {addedCompanies.length}{" "}
                {addedCompanies.length === 1 ? "Company" : "Companies"}
              </p>
            </div>
          </div>

          <div className="company-list">
            {addedCompanies.length === 0 ? (
              <div className="empty-state">No companies added</div>
            ) : (
              addedCompanies.map((company) => (
                <button
                  type="button"
                  key={company}
                  className={`company-item ${
                    selectedAdded === company ? "selected" : ""
                  }`}
                  onClick={() => setSelectedAdded(company)}
                >
                  <span className="radio">
                    {selectedAdded === company && (
                      <span className="radio-dot" />
                    )}
                  </span>
                  <span>{company}</span>
                </button>
              ))
            )}
          </div>
        </section>
      </main>

      <p className="help-text">
        Select a company, then use the arrows to move it between lists.
      </p>
    </div>
  );
}

export default App;
