import React from 'react';

const TagFilter = ({ allTags, selectedTags, onTagChange }) => {
  const handleSelectChange = (event) => {
    const options = event.target.options;
    const value = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    onTagChange(value);
  };

  return (
    <div className="tag-filter-container">
      <label htmlFor="tag-select">Filter by Tag:</label>
      <select
        id="tag-select"
        multiple
        value={selectedTags}
        onChange={handleSelectChange}
        className="tag-select"
      >
        {allTags.map((tag) => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TagFilter;
