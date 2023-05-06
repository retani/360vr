<script>
  import Dropzone from "svelte-file-dropzone";

  let files = {
    accepted: [],
    rejected: [],
    uploaded: [],
    failed: []
  };

  let filesStatus = []

  async function handleFilesSelect(e) {
    const { acceptedFiles, fileRejections } = e.detail;
    files.accepted = [...files.accepted, ...acceptedFiles];
    files.rejected = [...files.rejected, ...fileRejections];
    for (let i = 0; i < acceptedFiles.length; i++) {
      if (acceptedFiles[i].type == "text/plain") {
        const text = await acceptedFiles[i].text()
        //console.log(text)
        files.uploaded = [...files.uploaded, acceptedFiles[i]];
        const result = await addTextElement(text, textColumn)
        console.log("text", text, textColumn, result)
        if (uploadedTrigger) executeTrigger(uploadedTrigger, result)
      } else {
        uploadFile(acceptedFiles[i]);
      }
    }
  }

  const uploadEndpoint = InterkitClient.getUploadEndpoint()
  console.log("uploadEndpoint", uploadEndpoint);

  function uploadFile(file) {
    const formData = new FormData();
    console.log("upload ", file.path, file.name, file.size, file.type)
    formData.append('mediafile', file);
    //formData.append('projectId', $projectId);
    fetch(uploadEndpoint, {
        method: 'POST',
        body: formData
    })
    .then((response) => {
      console.log(response)
      return response.json()
    })
    .then((result) => {
      console.log('Success:', result);
      files.uploaded = [...files.uploaded, file];
      const type = file.type.split("/")[0]
    })
    .then((result) => {

    })
    .catch((error) => {
      console.error('Error:', error);
      files.failed = [...files.failed, file];
    });
  }
  
  $: {
    filesStatus = files.accepted.map( file => {
      const status = files.uploaded.findIndex( f => f === file) > -1 ? "uploaded" 
        : files.failed.findIndex( f => f === file) > -1 ? "failed"
        : "uploading..."
      const color = status == "uploaded" ? "darkgreen" : status == "failed" ? "red" : "blue"

      return {
        file,
        status,
        color
      }
    })
  }

</script>

<Dropzone on:drop={handleFilesSelect} multiple={true} />

<ol>
  {#each filesStatus as item}
    <li style={`color: ${item.color}`}>
      {item.file.name}
      ({item.file.size} bytes)
      :
      { item.status }
    </li>
  {/each}

</ol>