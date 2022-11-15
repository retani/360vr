<script>
  import { getContext } from 'svelte';

  const audioPaused      = getContext('audioPaused');
  const audioVolume      = getContext('audioVolume');
  const audioCurrentTime = getContext('audioCurrentTime');
  const audioStatus      = getContext('audioStatus');
</script>

<ul>
  <li>
    audio status: {$audioStatus}
  </li>
  <li>
    audio transport: {$audioPaused ? 'paused' : 'playing'}
  </li>
  <li>
    audio volume: {$audioVolume}
  </li>
  <li>
    audio time: {Math.round($audioCurrentTime)}s
  </li>
</ul>