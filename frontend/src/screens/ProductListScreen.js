import { Button, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { deleteProduct } from '../slices/adminProductsSlice';

const ProductListScreen = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.adminProducts);

  const deleteHandler = (id) => {
    dispatch(deleteProduct(id));
    toast.success('Proizvod je uklonjen');
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center my-3">
        <h1>Proizvodi</h1>
        <LinkContainer to="/admin/product/create">
          <Button type="button" className="my-3">
            <FaPlus /> Dodaj proizvod
          </Button>
        </LinkContainer>
      </div>

      <Table striped bordered hover responsive className="table-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>NAZIV</th>
            <th>CENA</th>
            <th>KATEGORIJA</th>
            <th>STANJE</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td>{product._id}</td>
              <td>{product.name}</td>
              <td>{product.price} RSD</td>
              <td>{product.category}</td>
              <td>{product.countInStock}</td>
              <td>
                <LinkContainer to={`/admin/product/${product._id}/edit`}>
                  <Button variant="light" className="btn-sm mx-2">
                    <FaEdit />
                  </Button>
                </LinkContainer>
                <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                  <FaTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default ProductListScreen;
