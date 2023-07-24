import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Penduduk = () => {
  const [pendudukList, setPendudukList] = useState([]);
  const [formData, setFormData] = useState({
    kepalakeluarga: '',
    jumlahAnggota: '',
    rt: '',
    rw: ''
  });
  const [selectedPenduduk, setSelectedPenduduk] = useState(null);

  useEffect(() => {
    fetchPenduduk();
  }, []);

  const fetchPenduduk = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('https://finalproject-api-chi.vercel.app/data/penduduk', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPendudukList(response.data);
    } catch (error) {
      console.error('An error occurred while retrieving the penduduk:', error);
    }
  };

  const createPenduduk = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('https://finalproject-api-chi.vercel.app/data/penduduk', formData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPendudukList([...pendudukList, response.data]);
      setFormData({
        kepalakeluarga: '',
        jumlahAnggota: '',
        rt: '',
        rw: ''
      });
    } catch (error) {
      console.error('An error occurred while creating the penduduk:', error);
    }
  };

  const updatePenduduk = async () => {
    try {
      if (!selectedPenduduk) {
        console.error('No penduduk selected for update');
        return;
      }

      const token = localStorage.getItem('token');
      const response = await axios.put(
        `https://finalproject-api-chi.vercel.app/data/penduduk/${selectedPenduduk._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setPendudukList(
        pendudukList.map((penduduk) =>
          penduduk._id === response.data._id ? response.data : penduduk
        )
      );
      setFormData({
        kepalakeluarga: '',
        jumlahAnggota: '',
        rt: '',
        rw: ''
      });
      setSelectedPenduduk(null);
    } catch (error) {
      console.error('An error occurred while updating the penduduk:', error);
    }
  };

  const deletePenduduk = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`https://finalproject-api-chi.vercel.app/data/penduduk/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        setPendudukList(pendudukList.filter((penduduk) => penduduk._id !== id));
      } else {
        console.error('Penduduk not found');
      }
    } catch (error) {
      console.error('An error occurred while deleting the penduduk:', error);
    }
  };

  const selectPenduduk = (penduduk) => {
    setSelectedPenduduk(penduduk);
    setFormData({
      kepalakeluarga: penduduk.kepalakeluarga,
      jumlahAnggota: penduduk.jumlahAnggota,
      rt: penduduk.rt,
      rw: penduduk.rw
    });
  };

  return (
    <div>
      <h1>Penduduk</h1>

      {/* Create Penduduk */}
      <h2>Create Penduduk</h2>
      <form onSubmit={selectedPenduduk ? updatePenduduk : createPenduduk}>
        <input
          type="text"
          placeholder="Kepala Keluarga"
          value={formData.kepalakeluarga}
          onChange={(e) => setFormData({ ...formData, kepalakeluarga: e.target.value })}
        />
        <input
          type="text"
          placeholder="Jumlah Anggota"
          value={formData.jumlahAnggota}
          onChange={(e) => setFormData({ ...formData, jumlahAnggota: e.target.value })}
        />
        <input
          type="text"
          placeholder="RT"
          value={formData.rt}
          onChange={(e) => setFormData({ ...formData, rt: e.target.value })}
        />
        <input
          type="text"
          placeholder="RW"
          value={formData.rw}
          onChange={(e) => setFormData({ ...formData, rw: e.target.value })}
        />
        <button type="submit">{selectedPenduduk ? 'Update' : 'Create'}</button>
      </form>

      {/* List Penduduk */}
      <h2>List Penduduk</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Kepala Keluarga</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Jumlah Anggota</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>RT</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>RW</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {pendudukList.map((penduduk) => (
            <tr key={penduduk._id}>
              <td style={{ border: '1px solid black', padding: '8px' }}>{penduduk.kepalakeluarga}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{penduduk.jumlahAnggota}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{penduduk.rt}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>{penduduk.rw}</td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                <button onClick={() => deletePenduduk(penduduk._id)}>Delete</button>
                <button onClick={() => selectPenduduk(penduduk)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Penduduk;
