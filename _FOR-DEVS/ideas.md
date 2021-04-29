# Things to add in Wrapper: Offline

## 1.3.0 changes
  - Backup/import _SAVED folder option
  - Optimized player flashvars

### Changes that can be done in settings.bat
  - Fix watermarks
  - Options for preview window (resolution, flash quality, etc)
  - Debug mode toggle
  - Add 4:3 mode

## Near-crucial
  - Easier way to import character IDs
  - Make TTS voice limit adaptive (bc it differs with websites)
  - Fix in-char-editor character scaling issue
  - Fix starters
  - Basic MP4 exporting (auto-record, not a true export)
  - Convert files to accepted file type when importing (webp and such)
  - Only disable HTTPS verification when needed

## Additional features
  - Make SWF pages actual HTML files (they're dynamically generated in javascript its weird)
  - Mac/Linux launcher
  - Logs folder to see command output
  - Add Whopper easter egg
  - Ability to move SFX to voice layer (lipsync)
  - Disable body parts without making a new character (allows easier wacky tricks like head movement and ***DECAPITATION***)
  - Original preview screen in-editor instead of a popup
  - Character organizing page (like the one from GA4SR) (2021 benson doesnt remember what this meant)
  - Add bat to reset dependencies to included and tested versions (in case newer versions break it)
  - Add file size reducing script (clean out unused character ids, clear cache, etc)
  - Easy and complete backup/restore system (including for other wrapper clones to switch to w:o)
  - Easy import and export character XMLs for sharing
  - A way to organize custom characters into sections
  - Props as character heads
  - Gun holding pose (prop-hand point)
  - Allow reload settings option after startup
  - Remove empty video files automatically
  - Add additional TTS voices
  - Port GA4SR assets

## Future dreams
  - Fully fix the original file uploading system
  - Older versions of the LVM
  - Custom UI styles
  - Custom themes
  - Compile newer version of ungoogled-chromium while removing Flash-blocking code? or just use a browser that already removes that idk
  - Make proper graphical installer/launcher, make everything more invisible
  - Render option (runs the animation as slow as will ensure 30/60fps at chosen resolution, auto-records, maybe runs through handbrake?)
    - Pre-run every scene to load all assets and prevent stutters
    - Make a new clip for every scene, and splice them together after
    - If any stutters are detected, stop recording, wait for normal framerate, then restart the scene.
      - If stuttering continues, run the scene at a lower speed until framerate is acceptable
  - Offline Text to Speech voices
  - Optimize Flash rendering/speed
  - switch to the gpl??? lots of licensing issues there and makes things more complex. might be better to set aside my stallmanism

# Done
  - Dark Mode
  - Fix the theme list (its really long)
  - Fix effects
  - Fix character copying
  - Include a copy of JPEXS Flash Dec? (mainly for far long into the centuries from now future)
  - Add option to download latest version (idk how this would've worked without github or somethin)
  - Stop using common.xml (i think this was about like trying to sort everything into their proper themes and making the import theme only show imported stuff)
    - The import theme can have Common disabled using SWF editing 
  - Select a theme before starting editor
 
