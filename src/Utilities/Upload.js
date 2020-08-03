import React, { Component } from 'react';
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MysqlLayer from './MysqlLayer';
//const mime = require('mime-types');

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      loaded: 0
    }

    this.mysqlLayer = new MysqlLayer();
    this.fileReader = new FileReader();
  }

  componentDidMount() {
    //console.log('Upload props: ', this.props);
    //console.log('mime: ', mime);
  }

  onChangeHandler = event => {
    let files = event.target.files;
    //let formats = this.props.formats;
    //console.log('files: ', files);
    //let fileName = event.target.name;
    if (this.checkFileType(files)) {
      if (this.maxSelectFile(event)) {
        // if return true allow to setState
        this.setState({
          selectedFile: files,
          //targetTable: fileName
        });
      }
    }
  }

  checkFileType = (files) => {
    let formats = this.props.formats;
    let type = files[0].type;
    //let err = '';
    /*console.log('files: ', files);
    console.log('type: ', type);
    console.log('formats: ', formats);
    console.log('typeof formats: ', typeof formats);*/
    if (type !== formats) {
      let format = formats.split('/');
      alert(`Please choose a file of type .${format[1]}`);
      return false;
    }
    return true;
  }

  checkFileSize = (event) => {
    let files = event.target.files;
    let size = 15000;
    let err = "";
    for (var x = 0; x < files.length; x++) {
      if (files[x].size > size) {
        err += files[x].type + 'is too large, please pick a smaller file\n';
      }
    };

    if (err !== '') {
      event.target.value = null;
      console.log(err);
      return false;
    }
    return true;
  }

  onClickHandler = async () => {
   const data = new FormData();
   if (this.state.selectedFile) {
     for (let x = 0; x < this.state.selectedFile.length; x++) {
       //console.log('selectedFile: ', this.state.selectedFile);
       data.append('file', this.state.selectedFile[x]);
     }

     await this.mysqlLayer.Post(`/upload/document`, data, {
       onUploadProgress: ProgressEvent => {
         this.setState({
           loaded: (ProgressEvent.loaded / ProgressEvent.total*100)
         })
       },
     })
     .then(res => {
       //console.log('res: ', res);//
       if (res.data.upload === 'success') toast.success('Upload successful');
     })
     .catch(err => {
       toast.error('Upload failed: ', err);
     });
   } else {
     toast.error('Please select a file to be uploaded');
   }
 }

 maxSelectFile = (event) => {
   let files = event.target.files;
   if (files.length > 3) {
     const msg = 'Only 3 files can be uploaded at a time';
     event.target.value = null; // discard selected file
     console.log(msg);
     return false;
   }
   return true;
 }

  render() {

    return (
      <div className="container">
        <div className="form-group">
          <ToastContainer />
        </div>
        <label>{this.props.message}</label>
        <input
          type="file"
          name="files"
          accept={this.props.formats}
          onChange={this.onChangeHandler}
        />
        <button type="button" className="btn btn-success btn-primary" onClick={this.onClickHandler}>
          Upload
        </button>
        <div className="form-group">
          <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
        </div>
      </div>
    );
  }
}

export default Upload;
