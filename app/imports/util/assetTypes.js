import { string, number, boolean } from 'yup';

const assetTypes = [
    {
      key: 'video',
      fields: {
        'name': {
          type: "text",
          required: true,
        },
        'mediafile': {
          type: "mediafile",
        },
        'url': {
          type: "url",
        },
        'hasAudio': {
          type: "boolean",
          default: true,
        },
        'loop': {
          type: "boolean",
          default: false,
        },
        'mute': {
          type: "boolean",
          default: false,
        },
      },
      constants: {
        'hasVideo': true,
        'hasTime': true,
      }
    },
    
    {
      key: 'janusaudio',
      fields: {
        'name': {
          type: "text",
          required: true,
        },
        'url': {
          type: "url",
          required: true,
        },
        'room': {
          type: "text",
          required: true
        },
        'apisecret': {
          type: "text",
          required: true
        },
      },
      constants: {
        'hasAudio': true,
        'hasMicrophone': true,
      }
    },

    {
      key: 'text',
      fields: {
        'name': {
          type: "text",
          required: true,
        },
        'text': {
          type: "text",
        }

      },
      constants: {
        'hasVideo': true
      },
    },

    {
      key: 'scene',
      fields: {
        'name': {
          type: "text",
          required: true,
        },
        'mediafile': {
          type: "mediafile",
        },
        'url': {
          type: "url",
        },
      },
      constants: {
        'hasVideo': true,
        'hasAudio': false,
      }
    },
  ]


export{
  assetTypes
}