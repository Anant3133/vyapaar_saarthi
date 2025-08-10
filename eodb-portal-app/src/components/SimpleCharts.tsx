import React from 'react';

// Simple hardcoded chart components that are guaranteed to be visible

interface BarChartData {
  label: string;
  value: number;
  color?: string;
}

interface LineChartData {
  label: string;
  value: number;
}

interface PieChartData {
  label: string;
  value: number;
  color: string;
}

interface AreaChartData {
  label: string;
  value1: number;
  value2?: number;
}

// Simple Bar Chart
export const SimpleBarChart = ({ data, height = 300, title }: { data: BarChartData[], height?: number, title?: string }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const barWidth = 300 / data.length - 10;

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <svg width="100%" height={height} viewBox="0 0 400 300" className="border border-border rounded-lg">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="40" y1={50 + i * 50} x2="360" y2={50 + i * 50} stroke="#e5e7eb" strokeWidth="1" opacity="0.3" />
        ))}
        
        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / maxValue) * 200;
          const x = 50 + index * (barWidth + 10);
          const y = 250 - barHeight;
          
          return (
            <g key={index}>
              <rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={item.color || '#3b82f6'}
                rx="4"
              />
              <text x={x + barWidth / 2} y="270" textAnchor="middle" fontSize="12" fill="#6b7280">
                {item.label}
              </text>
              <text x={x + barWidth / 2} y={y - 5} textAnchor="middle" fontSize="12" fill="#374151" fontWeight="bold">
                {item.value}
              </text>
            </g>
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => (
          <text key={i} x="35" y={255 - i * 50} textAnchor="end" fontSize="10" fill="#6b7280">
            {Math.round((maxValue / 4) * i)}
          </text>
        ))}
      </svg>
    </div>
  );
};

// Simple Line Chart
export const SimpleLineChart = ({ data, height = 300, title }: { data: LineChartData[], height?: number, title?: string }) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const width = 320;
  
  const points = data.map((item, index) => {
    const x = 50 + (index * (width - 100)) / (data.length - 1);
    const y = 250 - (item.value / maxValue) * 200;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <svg width="100%" height={height} viewBox="0 0 400 300" className="border border-border rounded-lg">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="40" y1={50 + i * 50} x2="360" y2={50 + i * 50} stroke="#e5e7eb" strokeWidth="1" opacity="0.3" />
        ))}
        
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Data points */}
        {data.map((item, index) => {
          const x = 50 + (index * (width - 100)) / (data.length - 1);
          const y = 250 - (item.value / maxValue) * 200;
          
          return (
            <g key={index}>
              <circle cx={x} cy={y} r="4" fill="#ffffff" stroke="#3b82f6" strokeWidth="2" />
              <text x={x} y="270" textAnchor="middle" fontSize="12" fill="#6b7280">
                {item.label}
              </text>
            </g>
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => (
          <text key={i} x="35" y={255 - i * 50} textAnchor="end" fontSize="10" fill="#6b7280">
            {Math.round((maxValue / 4) * i)}
          </text>
        ))}
      </svg>
    </div>
  );
};

// Simple Pie Chart
export const SimplePieChart = ({ data, height = 300, title }: { data: PieChartData[], height?: number, title?: string }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  const radius = 80;
  const centerX = 150;
  const centerY = 150;

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center">
          <svg width="300" height="300" viewBox="0 0 300 300" className="mb-4">
            {data.map((item, index) => {
              const angle = (item.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = centerX + radius * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = centerY + radius * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArc = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M ${centerX} ${centerY}`,
                `L ${x1} ${y1}`,
                `A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={item.color}
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              );
            })}
          </svg>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {data.map((item, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-foreground">{item.label}: {item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Area Chart
export const SimpleAreaChart = ({ data, height = 300, title }: { data: AreaChartData[], height?: number, title?: string }) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.value1, d.value2 || 0)));
  const width = 320;
  
  const points1 = data.map((item, index) => {
    const x = 50 + (index * (width - 100)) / (data.length - 1);
    const y = 250 - (item.value1 / maxValue) * 200;
    return `${x},${y}`;
  }).join(' ');
  
  const points2 = data.map((item, index) => {
    const x = 50 + (index * (width - 100)) / (data.length - 1);
    const y = 250 - ((item.value2 || 0) / maxValue) * 200;
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <svg width="100%" height={height} viewBox="0 0 400 300" className="border border-border rounded-lg">
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line key={i} x1="40" y1={50 + i * 50} x2="360" y2={50 + i * 50} stroke="#e5e7eb" strokeWidth="1" opacity="0.3" />
        ))}
        
        {/* Area 1 */}
        <polygon
          points={`50,250 ${points1} ${50 + (width - 100)},250`}
          fill="rgba(59, 130, 246, 0.3)"
          stroke="#3b82f6"
          strokeWidth="2"
        />
        
        {/* Area 2 (if exists) */}
        {data.some(d => d.value2) && (
          <polygon
            points={`50,250 ${points2} ${50 + (width - 100)},250`}
            fill="rgba(16, 185, 129, 0.3)"
            stroke="#10b981"
            strokeWidth="2"
          />
        )}
        
        {/* X-axis labels */}
        {data.map((item, index) => {
          const x = 50 + (index * (width - 100)) / (data.length - 1);
          return (
            <text key={index} x={x} y="270" textAnchor="middle" fontSize="12" fill="#6b7280">
              {item.label}
            </text>
          );
        })}
        
        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => (
          <text key={i} x="35" y={255 - i * 50} textAnchor="end" fontSize="10" fill="#6b7280">
            {Math.round((maxValue / 4) * i)}
          </text>
        ))}
      </svg>
    </div>
  );
};

// Progress Ring Chart (for compliance scores)
export const SimpleProgressRing = ({ value, total = 100, title, size = 120 }: { value: number, total?: number, title?: string, size?: number }) => {
  const percentage = (value / total) * 100;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>}
      <div className="relative">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r="45"
            stroke="#10b981"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-500"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold text-foreground">{Math.round(percentage)}%</span>
        </div>
      </div>
    </div>
  );
};