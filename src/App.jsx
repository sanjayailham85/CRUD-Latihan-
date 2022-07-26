import { useState, useEffect } from 'react';
import { db } from './firebase-config';
import {
  collection,
  doc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

import { storage } from './firebase-config';
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

function App() {
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState(0);
  const [imageUpload, setImageUpload] = useState(null);

  const [image, setImage] = useState([]);
  const imageRef = ref(storage, 'images/');

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, 'users');

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const increaseAge = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const decreaseAge = async (id, age) => {
    const userDoc = doc(db, 'users', id);
    const newFields = { age: age - 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, 'users', id);
    await deleteDoc(userDoc);
  };

  const uploadImage = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert('Image Uploaded');
    });
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    // useEffect(() => {
    //   listAll(imageRef).then((response) => {
    //     response.items.forEach((item) => {
    //       getDownloadURL(item).then((url) => {
    //         setImage((prev) => [...prev, url]);
    //       });
    //     });
    //   });
    // }, []);

    getUsers();
  }, []);

  return (
    <div className=" mt-5 mx-4 container-auto">
      <div>
        <input
          type="text"
          placeholder="Name"
          className="border-2 rounded px-2 mx-3 text-gray-700 "
          onChange={(event) => {
            setNewName(event.target.value);
          }}
        />
        <input
          type="number"
          placeholder="Age"
          className="border-2 rounded px-2 mx-3"
          onChange={(event) => {
            setNewAge(event.target.value);
          }}
        />
        <button
          onClick={createUser}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold  px-2 py-2 rounded shadow-md"
        >
          Create User
        </button>
      </div>

      {/* <div>
        <table className=" table-fixed border-2  ">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr item={user} key={user.name}></tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {users.map((user) => {
        return (
          <div className="mb-3 mt-5 mx-3">
            <div className="w-full border-2 px-3 py-3 rounded text-gray-500 ">
              <h3>Name : {user.name} </h3>
              <h3>Age : {user.age}</h3>
              <h3>ID : {user.id} </h3>
              <button
                onClick={() => {
                  increaseAge(user.id, user.age);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded shadow-md mt-3"
              >
                Increase age
              </button>

              <button
                onClick={() => {
                  decreaseAge(user.id, user.age);
                }}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded mx-3 shadow-md mt-3"
              >
                Decrease age
              </button>
              <button
                onClick={() => {
                  deleteUser(user.id);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 shadow-md rounded"
              >
                Delete user
              </button>
              <div className="py-5 ">
                <input
                  type="file"
                  onChange={(event) => {
                    setImageUpload(event.target.files[0]);
                  }}
                />
                <div className="py-2">
                  <button
                    onClick={uploadImage}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 shadow-md rounded"
                  >
                    Upload Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
