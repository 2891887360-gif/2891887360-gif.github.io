document.addEventListener('DOMContentLoaded', function() {
  // 找到微信图标链接
  const wechatLink = document. querySelector('a[href="#wechat"]');
  
  if (wechatLink) {
    wechatLink.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 创建弹窗显示二维码
      const modal = document.createElement('div');
      modal.innerHTML = `
        <div style="position:  fixed; top: 0; left: 0; width:  100%; height: 100%; 
                    background: rgba(0,0,0,0.8); z-index: 9999; 
                    display: flex; align-items: center; justify-content:  center;"
                    onclick="this.parentElement.remove()">
          <div style="background: white; padding: 20px; border-radius: 10px; text-align: center;"
               onclick="event.stopPropagation()">
            <h3>微信联系我</h3>
            <img src="/assets/img/wechat-qr.png" alt="WeChat QR Code" style="width: 300px; height: 300px;">
            <p>微信号：RollingTheRock</p>
            <button onclick="this.closest('div').parentElement.remove()" 
                    style="margin-top: 10px; padding: 10px 20px; cursor: pointer; 
                           background: #07c160; color: white; border:  none; border-radius: 5px;">关闭</button>
          </div>
        </div>
      `;
      document.body.appendChild(modal);
    });
  }
});
