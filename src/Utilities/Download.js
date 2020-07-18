import React, { Component } from 'react';
import fileDownload from 'js-file-download';
import MysqlLayer from './MysqlLayer';

class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false
    }

    this.mysqlLayer = new MysqlLayer();
    this.downloadFile = this.downloadFile.bind(this);
  }

  componentDidMount() {
    console.log('Download props: ', this.props);
    //this.downloadFile();
  }

  /*







link.href = window.URL.createObjectURL(blob);
link.download = pdfFileName;

link.click();
*/

  downloadFile() {
    console.log('downloading...');
    //console.log('__dirname: ', __dirname);
    const fileName = '2020-07-18 18:58:10-Proof of ID.pdf';
    this.mysqlLayer.Post(`/download/document/${fileName}` )
      .then(({ data }) => {
        console.log('data: ', data);

        const anchorTag = document.createElement('a');
    anchorTag.href = data;
    anchorTag.download = "My PDF File.pdf";
    anchorTag.click();
        /*let binaryString = window.atob(data);
        let binaryLen = binaryString.length;
        console.log('binaryLen: ', binaryLen);
        let bytes = new Uint8Array(binaryLen);

        for (let i = 0; i < binaryLen; i++) {
            let ascii = binaryString.charCodeAt(i);
            bytes[i] = ascii;
        }

        let blob = new Blob([bytes], {type: "application/pdf"});

        let link= document.createElement('a');
        link.setAttribute('href', 'data:application/pdf;base64,');

        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;

        link.click();
        /*link.setAttribute('download', 'ID proof.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);*/
        //fileDownload(data, 'ID proof.pdf');
        console.log('successful download: ');
      })
      .catch(err => {
        console.log('downloadFile error: ', err);
      });
  }

  render() {
    return (
      <div className="container">
        <button onClick={() => this.downloadFile()}>Download the file</button>
      </div>
    );
  }
}

export default Download;
