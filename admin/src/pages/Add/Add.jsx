import { useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {

  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Vêtements"
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);

    try {
      const response = await axios.post(`${url}/api/product/add/`, formData);
      if (response.data.success) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Vêtements"
        });
        setImage(null);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    }
  };

  return (
    <div>
      <div className="add">
        <form className="flex-col" onSubmit={onSubmitHandler}>
          <div className="add-img-upload flex-col">
            <p>Télécharger une image</p>
            <label htmlFor="image">
              <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="" />
            </label>
            <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden required />
          </div>
          <div className="add-product-name flex-col">
            <p>Nom du produit</p>
            <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Écrivez ici" />
          </div>
          <div className="add-product-description flex-col">
            <p>Description du produit</p>
            <textarea onChange={onChangeHandler} value={data.description} name="description" rows="6" placeholder="Écrivez du contenu ici" required></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Catégorie de produit</p>
              <select onChange={onChangeHandler} name="category" value={data.category}>
                <option value="Vêtements">Vêtements</option>
                <option value="Chaussures">Chaussures</option>
                <option value="Lingerie, Nuit & Bain">Lingerie, Nuit & Bain</option>
                <option value="Accessoires & Bijoux">Accessoires & Bijoux</option>
                <option value="Beauté">Beauté</option>
                <option value="Perruques">Perruques</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Prix du produit</p>
              <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="20€" />
            </div>
          </div>
          <button type="submit" className="add-btn">AJOUTER</button>
        </form>
      </div>
    </div>
  );
};

export default Add;