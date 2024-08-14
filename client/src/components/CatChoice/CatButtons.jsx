import React from 'react'
import './CatChoice.css'

const CatButtons = ({selectedCat, setSelectedCat, catImage, setCatImage}) => {

  const catsTypes = [
    { id: 0, category: 'Black Cat' },
    { id: 1, category: 'Siamese Cat' },
    { id: 2, category: 'Calico Cat' },
    { id: 3, category: 'Maine Coon Cat' },
    { id: 4, category: 'Orange Cat' },
    { id: 5, category: 'Persian Cat' },
    { id: 6, category: 'Tabby Cat' },
    { id: 7, category: 'Tortie Cat' },
  ];
  
  const handleCatChange = (event) => {
    const selectedCat = event.target.value;
    setSelectedCat(selectedCat);
    setCatImage(selectedCat);
    console.log(`The selected cat is ${selectedCat}`)
  
    // Update the image source based on the selected cat type
    switch (selectedCat) {
      case 'Black Cat':
        setCatImage('/black-cat.png');
        break;
      case 'Orange Cat':
        setCatImage('/orange-cat.png');
        break;
      case 'Calico Cat':
        setCatImage('/calico-cat.png');
        break;
      case 'Maine Coon Cat':
        setCatImage('/maine-coon-cat.png');
        break;
      case 'Persian Cat':
        setCatImage('/persian-cat.png');
        break;
      case 'Siamese Cat':
        setCatImage('/Siamese-cat.png');
        break;
      case 'Tabby Cat':
        setCatImage('/tabby-cat.png');
        break;
      case 'Tortie Cat':
        setCatImage('/torti-cat.png');
        break;
      default:
        setCatImage('/orange-cat.png');
    }
  };

  return (
    <div>
      <img src={catImage} alt="Cat" />
        <div className="row">
          {catsTypes.map((cat) => (
            <div id="ck-button">
              <label for={cat.category} key={cat.id}>
                <input 
                  id={cat.category}
                  type="radio" 
                  value={cat.category}
                  checked={selectedCat === cat.category}
                  onChange={handleCatChange}
                  name="cat"
                />
                <span>{cat.category}</span>
              </label>
            </div>
          ))}
        </div>
    </div>
  );
};

export default CatButtons;