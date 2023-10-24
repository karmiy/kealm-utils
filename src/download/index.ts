type VirtualFileInfo = {
    filename: string;
    mimeType?: string;
};

const iframeDownloader = (id: string, url: string, filename: string) => {
    let _iframe: HTMLIFrameElement | null = document.querySelector(`#${id}`);
    if (!_iframe) {
        _iframe = document.createElement('iframe');
        _iframe.id = id;
        _iframe.style.display = 'none';
        _iframe.name = filename;
        document.body.appendChild(_iframe);
    }
    _iframe.src = url;
};

class DownloadManager {
    downloadFile(url: string, virtualFileInfo?: VirtualFileInfo, preventPageHook?: boolean) {
        const filename = virtualFileInfo?.filename || url.substr(url.lastIndexOf('/') + 1) || '';

        if (preventPageHook) {
            iframeDownloader('downloadFile', url, filename);
            return;
        }
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute('href', url);
        downloadAnchorNode.setAttribute('download', filename);
        if (virtualFileInfo?.mimeType) {
            downloadAnchorNode.setAttribute('type', virtualFileInfo?.mimeType);
        }
        document.body.appendChild(downloadAnchorNode); // required for firefox
        // bubbles: false, prevent handle by linkClickingManager
        downloadAnchorNode.dispatchEvent(new MouseEvent('click', { bubbles: false }));
        downloadAnchorNode.remove();
    }
}
const downloadManager = new DownloadManager();

export { downloadManager };
