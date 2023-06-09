<script>
  import Dropzone from "svelte-file-dropzone/src/lib/components/Dropzone.svelte";

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
      uploadFile(acceptedFiles[i]);
      /*if (acceptedFiles[i].type == "text/plain") {
        const text = await acceptedFiles[i].text()
        //console.log(text)
        files.uploaded = [...files.uploaded, acceptedFiles[i]];
        const result = await addTextElement(text, textColumn)
        console.log("text", text, textColumn, result)
        if (uploadedTrigger) executeTrigger(uploadedTrigger, result)
      } else {
        uploadFile(acceptedFiles[i]);
      }*/
    }
  }

  const uploadEndpoint = "/api/upload"
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
      const color = status == "uploaded" ? "darkgreen" : status == "failed" ? "red" : "#55f"

      return {
        file,
        status,
        color
      }
    })
    filesStatus = filesStatus.filter( item => item.status != "uploaded")
  }

</script>

<br />
<Dropzone on:drop={handleFilesSelect} multiple={true} containerStyles="background-color: grey; color: white;"/>

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

<style>
  ol {
    min-height: 2rem;
  }
  li {
    height: rem;
    line-height: 2rem;
    padding: 0 1rem;
    border-radius: 0.25rem;
    margin-right: 1rem;
    background-color: #333;
    display: inline-block;
  }
</style>