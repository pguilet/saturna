import axios from 'axios';

export const getDownloadSignedLink = async (path) => {
     var res = await axios.post('/api/downloadSignedLinkForFile', {
          path: path,
     });
     if (res.data) {
          return res.data;
     }
     return undefined;
};
export default getDownloadSignedLink;

export const uploadFileLocally = async (files, identifiant) => {
     let data = new FormData();
     if (files) {
          for (var x = 0; x < files.length; x++) {
               data.append('file', files[x]);
          }
     }
     data.append('identifiant', identifiant);

     var res = await axios.post('/api/uploadFileLocally', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
     });
     return res.data;
};

export const uploadImageFileLocally = async (files, identifiant) => {
     let data = new FormData();
     if (files) {
          for (var x = 0; x < files.length; x++) {
               data.append('file', files[x]);
          }
     }
     data.append('identifiant', identifiant);

     var res = await axios.post('/api/uploadImageFileLocally', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
     });
     return res.data;
};
