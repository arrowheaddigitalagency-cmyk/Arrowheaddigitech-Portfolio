import sys, subprocess, re
from pathlib import Path
sys.path.insert(0,str(Path('.tmp-video-frames/tools').resolve()))

ffmpeg=str(Path('.tmp-video-frames/decoder/package/ffmpeg.exe').resolve())
sources=[('home',r'C:\Users\Usman Farooqi\Videos\Captures\Sharplink _ Home - Google Chrome 2026-09-16 14-24-37.mp4'),('about',r'C:\Users\Usman Farooqi\Videos\Captures\Sharplink _ About - Google Chrome 2026-09-16 14-27-02.mp4')]
for name,source in sources:
    probe=subprocess.run([ffmpeg,'-hide_banner','-i',source],capture_output=True,text=True).stderr
    match=re.search(r'Duration: (\d+):(\d+):([\d.]+)',probe)
    duration=int(match[1])*3600+int(match[2])*60+float(match[3])
    output=f'.tmp-video-frames/{name}-storyboard.jpg'
    subprocess.run([ffmpeg,'-y','-i',source,'-vf',f'fps={12/duration},scale=600:-1,tile=3x4','-frames:v','1','-q:v','2',output],capture_output=True,check=True)
    print(name,duration,output,flush=True)

