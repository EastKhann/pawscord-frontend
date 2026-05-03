import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { LazyVideo, FileAttachment } from './MediaComponents';


// -- dynamic style helpers (pass 2) --

const S = {
  txt: { color: '#b5bac1', fontSize: '12px', marginTop: '4px', opacity: 0.7 },
  border: { width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0 },
};

const getMediaUrl = (m, absoluteHostUrl) => {
  const url = m.image_url || m.image || m.file_url || m.file;
  if (!url) return null;
  if (url.startsWith('http') || url.startsWith('blob:')) return url;
  return `${(absoluteHostUrl || '').replace(/\/$/, '')}/${url.replace(/^\//, '')}`;
};

const isImageItem = (m) => {
  const url = m.image_url || m.image;
  if (url) return true;
  const fn = (m.file_name || '').toLowerCase();
  return ['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'svg', 'ico'].some(e => fn.endsWith(`.${e}`));
};

const isVideoItem = (m) => {
  const fn = (m.file_name || '').toLowerCase();
  const isVoice = fn.startsWith('voice_') || fn.startsWith('voice-');
  return !isVoice && ['mp4', 'mov', 'mkv', 'webm'].some(e => fn.endsWith(`.${e}`));
};

const getGridStyle = (count) => {
  if (count === 1) return { gridTemplateColumns: '1fr', maxWidth: '450px' };
  if (count === 2) return { gridTemplateColumns: '1fr 1fr', maxWidth: '500px' };
  if (count === 3) return { gridTemplateColumns: '1fr 1fr 1fr', maxWidth: '550px' };
  if (count === 4) return { gridTemplateColumns: '1fr 1fr', maxWidth: '500px' };
  return { gridTemplateColumns: 'repeat(3, 1fr)', maxWidth: '600px' };
};

export const GalleryGrid = memo(({ galleryGroup, onImageClick, onContentLoad, absoluteHostUrl }) => {
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const imageItems = galleryGroup.filter(m => isImageItem(m) || isVideoItem(m));
  const fileItems = galleryGroup.filter(m => !isImageItem(m) && !isVideoItem(m));
  const count = imageItems.length;

  return (
    <div aria-label={t('message.galleryGrid', 'Image gallery')}>
      {imageItems.length > 0 && (
        <div>
          {imageItems.map((item, idx) => {
            const url = getMediaUrl(item, absoluteHostUrl);
            if (!url) return null;
            if (isVideoItem(item)) {
              return (
                <div key={item.id || idx} style={{ position: 'relative', backgroundColor: '#000', minHeight: count > 4 ? '120px' : '180px' }}>
                  <LazyVideo src={url} style={S.border} />
                </div>
              );
            }
            return (
              <img
                key={item.id || idx}
                src={url}
                alt={t('alt.gallery', 'Gallery')}
                style={{ width: '100%', height: count > 4 ? '120px' : (count > 2 ? '160px' : '200px'), objectFit: 'cover', cursor: 'pointer', display: 'block' }}
                onClick={() => onImageClick(url)}
                loading="lazy"
                onLoad={idx === 0 ? onContentLoad : undefined}
              />
            );
          })}
        </div>
      )}
      {imageItems.length > 0 && (
        <div style={S.txt}>
          📎 {count} media
        </div>
      )}
      {fileItems.map((item, idx) => (
        <FileAttachment key={item.id || idx} fileUrl={getMediaUrl(item, absoluteHostUrl)} fileName={item.file_name} fileSize={item.file_size} />
      ))}
    </div>
  );
});

GalleryGrid.displayName = 'GalleryGrid';
GalleryGrid.propTypes = {
  galleryGroup: PropTypes.object,
  onImageClick: PropTypes.func,
  onContentLoad: PropTypes.func,
  absoluteHostUrl: PropTypes.string,
};

export default GalleryGrid;