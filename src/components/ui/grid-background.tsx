import React from 'react';

// 背景辅助线 SVG 组件 - 竖线、顶栏横线和左上角半闭合圆形
function GridBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      <svg 
        width="100%" 
        height="100%"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          {/* 渐隐效果 - 用于底部竖线 */}
          <linearGradient id="fade-out-bottom" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.2" />
            <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
          </linearGradient>
        </defs>
        
        {/* 竖线 - 贯穿整个高度，统一使用 strokeWidth="1" */}
        {/* 左侧 1 分界线 - 10% */}
        <line 
          x1="10%" 
          y1="0" 
          x2="10%" 
          y2="100%" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="4,4" 
          opacity="0.15"
        />
        
        {/* 右侧 1 分界线 - 90% */}
        <line 
          x1="90%" 
          y1="0" 
          x2="90%" 
          y2="100%" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="4,4" 
          opacity="0.15"
        />
        
        {/* 中间 8 区域的中心竖线 - 渐隐，统一使用 strokeWidth="1" */}
        <line 
          x1="50%" 
          y1="70%" 
          x2="50%" 
          y2="100%" 
          stroke="url(#fade-out-bottom)" 
          strokeWidth="1" 
          strokeDasharray="4,4"
        />
        
        {/* 顶栏下边 - 唯一固定位置的横线，统一使用 strokeWidth="1" */}
        <line 
          x1="0" 
          y1="56" 
          x2="100%" 
          y2="56" 
          stroke="currentColor" 
          strokeWidth="1" 
          strokeDasharray="4,4" 
          opacity="0.2"
        />
      </svg>
    </div>
  );
}

export { GridBackground };
