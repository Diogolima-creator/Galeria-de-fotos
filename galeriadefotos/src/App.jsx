import { useState, useEffect} from 'react';
import * as C from './App.styles';
import * as Photos from './services/photos'
import { PhotoItem } from './components/PhotoItem';
import { storage } from './libs/firebase.js'
import { ref, listAll, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage';


const App = () => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState([]);

  useEffect(()=>{
    const getPhotos = async () =>{
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false); 
    }
    getPhotos();
  },[]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const file = formData.get('image');

    if(file && file.size > 0){
      setUploading(true);
      let result = await Photos.insert(file);
      setUploading(false);

      if(result instanceof Error){
        alert(`${result.name}-${result.message}`);
      } else{
        let newPhotoList = [...photos];
        newPhotoList.push(result);
        setPhotos(newPhotoList);
      }
    }
  }

  const handleDel = async ( name ) => {
    var delFile = ref(storage, `images/${name}`)
    var del = await deleteObject(delFile);

    if(del instanceof Error){
      alert(`${del.name}-${del.message}`);
    } else{
      setLoading(true);
      setPhotos(await Photos.getAll());
      setLoading(false);
    }
  }

  return(
    <C.Container>
      <C.Area>
        <C.Header>Galeria de fotos</C.Header>

        <C.UploadForm method = "POST" onSubmit={handleFormSubmit}>
          <input type="file" name="image" />
          <input type="submit" name="Enviar"></input>
          {uploading && 'Enviando...'}
        </C.UploadForm>

        {loading &&
        <C.ScreenWaning>
          <div className="emoji">✋</div>
          <div>Carregando...</div>
        </C.ScreenWaning>
          }

          {!loading && photos.length > 0 && 
            <C.PhotoList>
              {photos.map((item,index)=>(
                <PhotoItem key={index} url={item.url} name={item.name} del={handleDel}/>
              ))}

            </C.PhotoList>
          }

          {!loading && photos.length === 0 &&
          <C.ScreenWaning>
          <div className="emoji">😞</div>
          <div>Não há fotos cadastradas.</div>
        </C.ScreenWaning>

          }
      </C.Area>
    </C.Container>
  );
}

export default App;