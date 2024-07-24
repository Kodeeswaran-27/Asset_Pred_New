// import React, { useState } from 'react';

// const SearchBar = ({ options, selectedAssets, onChange }) => {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [checkedItems, setCheckedItems] = useState([]);

//   const handleSearch = (event) => {
//     const searchValue = event.target.value.toLowerCase();
//     setSearchTerm(searchValue);

//     const filteredOptions = options.filter(option =>
//       option.label.toLowerCase().includes(searchValue)
//     );

//     // Automatically check top 3 items
//     const top3Items = filteredOptions.slice(0, 3).map(option => option.value);
//     setCheckedItems(top3Items);

//     onChange(filteredOptions);
//   };

//   const handleCheckboxChange = (value) => {
//     const newCheckedItems = checkedItems.includes(value)
//       ? checkedItems.filter(item => item !== value)
//       : [...checkedItems, value];

//     setCheckedItems(newCheckedItems);
//     onChange(newCheckedItems);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search..."
//         value={searchTerm}
//         onChange={handleSearch}
//         style={{ width: '100%', padding: '8px' }}
//       />
//       <ul>
//         {options.map(option => (
//           <li key={option.value}>
//             <input
//               type="checkbox"
//               checked={checkedItems.includes(option.value)}
//               onChange={() => handleCheckboxChange(option.value)}
//             />
//             {option.label}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// // Replace your <Select> component with <SearchBar>
// <SearchBar
//   options={assetOptions}
//   selectedAssets={selectedAssets}
//   onChange={(newCheckedItems) => {
//     setSelectedAssets(newCheckedItems);
//   }}
// />
