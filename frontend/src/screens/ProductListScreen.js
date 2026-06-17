import { Button, Table } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDeleteProductMutation, useGetProductsQuery } from '../slices/productsApiSlice';

const ProductListScreen = () => {
  const { data: products = [], isLoading, error, refetch } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Da li ste sigurni?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Proizvod je uklonjen');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
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

      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.message || error.error}</Message>
      ) : (
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
      )}
    </>
  );
};

export default ProductListScreen;
