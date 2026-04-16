import { useState, useRef, useEffect } from "react";
import styled, { createGlobalStyle, keyframes, css } from "styled-components";
// ── Local theme (replaces @rdc-npm/rdc-ui rdcUiTheme) ───────────────────────
const rdcUiTheme = {
  color: {
    bg: {
      primary:   '#FFFFFF',
      secondary: '#F4F0EB',
      alternate: '#1A1816',
    },
    text: {
      primary:        '#1A1816',
      secondary:      '#726A60',
      primaryReverse: '#FFFFFF',
    },
    border: {
      base:      '#D3CFCA',
      accent:    '#E5E1DC',
      secondary: '#C8C3BC',
    },
    status: {
      success:       '#2D8653',
      successSubtle: '#D4F0E0',
      info:          '#0D57D4',
    },
    interactive: {
      primary: { default: { initial: '#1A1816' } }
    },
    gray: { '50': '#F8F7F7' },
  },
  size: {
    borderRadius: { '100': '4px', '200': '8px', '300': '12px' }
  },
  typography: {
    scale: {
      body200:    { size: '12px', lineHeight: '16px', fontWeight: 400 },
      body300:    { size: '14px', lineHeight: '20px', fontWeight: 400 },
      body400:    { size: '16px', lineHeight: '24px', fontWeight: 400 },
      display700: { size: '24px', lineHeight: '32px', letterSpacing: '-0.24px' },
      display800: { size: '32px', lineHeight: '40px', letterSpacing: '-0.5px' },
    },
    weight: { medium: 500 }
  }
};

// ── Local component replacements (replaces @rdc-npm/rdc-ui imports) ──────────

function Button({ styleType, onClick, children, style, disabled }) {
  const isPrimary = styleType === 'PrimaryDefault';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 16px',
        borderRadius: rdcUiTheme.size.borderRadius['100'],
        border: isPrimary ? 'none' : `1px solid ${rdcUiTheme.color.border.base}`,
        background: isPrimary ? rdcUiTheme.color.bg.alternate : 'transparent',
        color: isPrimary ? rdcUiTheme.color.text.primaryReverse : rdcUiTheme.color.text.primary,
        fontSize: rdcUiTheme.typography.scale.body300.size,
        fontWeight: rdcUiTheme.typography.weight.medium,
        lineHeight: rdcUiTheme.typography.scale.body300.lineHeight,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'inherit',
        ...style,
      }}
    >
      {children}
    </button>
  );
}

const TAG_COLORS = {
  blueSubtle:   { bg: '#E9EFFB', color: '#0D2C62' },
  greenSubtle:  { bg: '#D4F0E0', color: '#203C25' },
  purpleSubtle: { bg: '#F7DEF8', color: '#53195D' },
  yellowSubtle: { bg: '#FEFACD', color: '#5C4700' },
  graySubtle:   { bg: '#F4F0EB', color: '#726A60' },
  redSubtle:    { bg: '#FEE2E3', color: '#7F1D20' },
  blue:         { bg: '#0D57D4', color: '#FFFFFF' },
};

function Tag({ dataColor, children, style, disableCasingRule }) {
  const c = TAG_COLORS[dataColor] || TAG_COLORS.graySubtle;
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: '100px',
        background: c.bg,
        color: c.color,
        fontSize: rdcUiTheme.typography.scale.body200.size,
        fontWeight: rdcUiTheme.typography.weight.medium,
        lineHeight: rdcUiTheme.typography.scale.body200.lineHeight,
        whiteSpace: 'nowrap',
        textTransform: disableCasingRule ? 'none' : undefined,
        ...style,
      }}
    >
      {children}
    </span>
  );
}

function ProgressMeter({ value, id, valueText, progressBarProps, dataColor }) {
  const pct = Math.min(100, Math.max(0, value || 0));
  const barColor = dataColor === 'success' ? rdcUiTheme.color.status.success : rdcUiTheme.color.text.primary;
  const { style: pbStyle, ...pbRest } = progressBarProps || {};
  return (
    <div
      id={id}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuetext={valueText}
      style={{ width: '100%', height: '8px', background: rdcUiTheme.color.border.accent, borderRadius: '100px', overflow: 'hidden', ...pbStyle }}
      {...pbRest}
    >
      <div style={{ width: `${pct}%`, height: '100%', background: barColor, borderRadius: '100px', transition: 'width 0.3s ease' }} />
    </div>
  );
}

function Accordion({ title, tags, size, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ border: `1px solid ${rdcUiTheme.color.border.base}`, borderRadius: rdcUiTheme.size.borderRadius['200'], overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          padding: size === 'small' ? '12px 16px' : '16px 20px',
          background: rdcUiTheme.color.bg.secondary,
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'inherit',
          fontSize: rdcUiTheme.typography.scale.body300.size,
          fontWeight: rdcUiTheme.typography.weight.medium,
          color: rdcUiTheme.color.text.primary,
          textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          {title}
          {tags && tags.map((t, i) => <Tag key={i} dataColor={t.dataColor}>{t.text}</Tag>)}
        </span>
        <span style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s', flexShrink: 0 }}>▼</span>
      </button>
      {open && (
        <div style={{ padding: size === 'small' ? '12px 16px' : '16px 20px', background: rdcUiTheme.color.bg.primary }}>
          {children}
        </div>
      )}
    </div>
  );
}

function InlineMessage({ styleType, showIcon, children, style }) {
  const isError = styleType === 'error';
  const isSuccess = styleType === 'success';
  const bg = isError ? '#FEE2E3' : isSuccess ? rdcUiTheme.color.status.successSubtle : '#E9EFFB';
  const color = isError ? '#7F1D20' : isSuccess ? rdcUiTheme.color.status.success : rdcUiTheme.color.status.info;
  const icon = isError ? '⚠' : isSuccess ? '✓' : 'ℹ';
  return (
    <div
      role={isError ? 'alert' : 'status'}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '8px',
        padding: '12px 16px',
        borderRadius: rdcUiTheme.size.borderRadius['200'],
        background: bg,
        color,
        fontSize: rdcUiTheme.typography.scale.body300.size,
        lineHeight: rdcUiTheme.typography.scale.body300.lineHeight,
        ...style,
      }}
    >
      {showIcon && <span aria-hidden="true">{icon}</span>}
      <span>{children}</span>
    </div>
  );
}

function IconChevronLeft({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconSchool({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" fill={color} />
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" fill={color} />
    </svg>
  );
}

function IconClock({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke={color} strokeWidth="1.5" />
      <path d="M12 7v5l3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Link({ as: As = 'a', reverse, onClick, style, children, ...rest }) {
  return (
    <As
      onClick={onClick}
      style={{
        color: reverse ? rdcUiTheme.color.text.primaryReverse : rdcUiTheme.color.text.primary,
        textDecoration: 'underline',
        cursor: 'pointer',
        background: 'none',
        border: 'none',
        padding: 0,
        fontFamily: 'inherit',
        fontSize: 'inherit',
        ...style,
      }}
      {...rest}
    >
      {children}
    </As>
  );
}

function FormHelperText({ id, helperText }) {
  return (
    <p id={id} style={{ margin: '4px 0 0', fontSize: rdcUiTheme.typography.scale.body200.size, lineHeight: rdcUiTheme.typography.scale.body200.lineHeight, color: rdcUiTheme.color.text.secondary }}>
      {helperText}
    </p>
  );
}

function TableContainer({ children }) {
  return <div style={{ width: '100%', overflowX: 'auto' }}>{children}</div>;
}

function Table({ withLines, children }) {
  return (
    <table style={{ width: '100%', borderCollapse: withLines ? 'collapse' : 'separate', borderSpacing: 0 }}>
      {children}
    </table>
  );
}

function TableHeader({ children }) {
  return <thead>{children}</thead>;
}

function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

function TableRow({ children, style }) {
  return <tr style={style}>{children}</tr>;
}

function TableCell({ as: As = 'td', children, style }) {
  return (
    <As
      style={{
        padding: '12px 16px',
        fontSize: rdcUiTheme.typography.scale.body300.size,
        lineHeight: rdcUiTheme.typography.scale.body300.lineHeight,
        color: rdcUiTheme.color.text.primary,
        borderBottom: `1px solid ${rdcUiTheme.color.border.accent}`,
        textAlign: 'left',
        verticalAlign: 'top',
        ...style,
      }}
    >
      {children}
    </As>
  );
}

function ContentSwitchGroup({ size, style, children }) {
  return (
    <div
      role="tablist"
      style={{
        display: 'inline-flex',
        borderRadius: rdcUiTheme.size.borderRadius['100'],
        border: `1px solid ${rdcUiTheme.color.border.base}`,
        overflow: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function ContentSwitch({ selected, onClick, iconBefore, children, style }) {
  return (
    <button
      role="tab"
      aria-selected={selected}
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '8px 14px',
        border: 'none',
        borderRadius: 0,
        background: selected ? rdcUiTheme.color.bg.alternate : 'transparent',
        color: selected ? rdcUiTheme.color.text.primaryReverse : rdcUiTheme.color.text.primary,
        fontSize: rdcUiTheme.typography.scale.body300.size,
        fontWeight: rdcUiTheme.typography.weight.medium,
        cursor: 'pointer',
        fontFamily: 'inherit',
        ...style,
      }}
    >
      {iconBefore}
      {children}
    </button>
  );
}

function IconBarChart({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="10" width="4" height="11" />
      <rect x="10" y="5" width="4" height="16" />
      <rect x="17" y="13" width="4" height="8" />
    </svg>
  );
}

function IconBarChartFilled({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="3" y="10" width="4" height="11" />
      <rect x="10" y="5" width="4" height="16" />
      <rect x="17" y="13" width="4" height="8" />
    </svg>
  );
}

function IconList({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="3" y="5" width="2" height="2" fill="currentColor" />
      <rect x="3" y="11" width="2" height="2" fill="currentColor" />
      <rect x="3" y="17" width="2" height="2" fill="currentColor" />
      <rect x="8" y="5" width="13" height="2" fill="currentColor" />
      <rect x="8" y="11" width="13" height="2" fill="currentColor" />
      <rect x="8" y="17" width="13" height="2" fill="currentColor" />
    </svg>
  );
}

function IconUpload({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="17 8 12 3 7 8" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="12" y1="3" x2="12" y2="15" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconProfile({ size = 16, color = 'currentColor' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="12" cy="7" r="4" stroke={color} strokeWidth="1.5" />
    </svg>
  );
}

function Form({ children, ...props }) {
  return <div {...props}>{children}</div>;
}

function FormControlSet({ id, legend, direction, children }) {
  return (
    <fieldset id={id} style={{ border: 'none', margin: 0, padding: 0 }}>
      {legend && (
        <legend style={{ position: 'absolute', width: '1px', height: '1px', margin: '-1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}>
          {legend}
        </legend>
      )}
      <div style={{ display: 'flex', flexDirection: direction === 'horizontal' ? 'row' : 'column', gap: '8px', flexWrap: 'wrap' }}>
        {children}
      </div>
    </fieldset>
  );
}

function FormControlLabel({ checked, control, id, name, onChange, value, children }) {
  return (
    <label htmlFor={id} style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: rdcUiTheme.typography.scale.body300.size, color: rdcUiTheme.color.text.primary }}>
      <input
        type="checkbox"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        style={{ width: '16px', height: '16px', cursor: 'pointer', accentColor: rdcUiTheme.color.bg.alternate }}
      />
      {children}
    </label>
  );
}

function Checkbox() {
  return null;
}

// ── Constants ────────────────────────────────────────────────────────────────

const COVER_IMG = "/a11y-icons.svg";
const LOGO_IMG  = "/haven-logo.png";
const FONT      = "'Galano Grotesque Alt', system-ui, sans-serif";

const CAT = {
  teal:   { bold:"#00615F", subtle:"#CCF3F3" },
  blue:   { bold:"#0D2C62", subtle:"#E9EFFB" },
  purple: { bold:"#53195D", subtle:"#F7DEF8" },
  orange: { bold:"#582D1D", subtle:"#FFDFB5" },
  pink:   { bold:"#651249", subtle:"#FBDCEF" },
  green:  { bold:"#203C25", subtle:"#DAF1DB" },
  red:    { bold:"#7F1D20", subtle:"#FEE2E3" }
};

const DONT_GRADIENT = "linear-gradient(to right, #B50005 0%, #FF3E55 25%, #FF7586 50%, #DC3E42 100%)";
const DO_GRADIENT   = "linear-gradient(to right, #65BA74 0%, #50DF43 50%, #25E42D 75%, #46A758 100%)";

function useNarrow(bp) {
  const [narrow, setNarrow] = useState(() => typeof window !== "undefined" && window.innerWidth <= bp);
  useEffect(() => {
    const handler = () => setNarrow(window.innerWidth <= bp);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, [bp]);
  return narrow;
}

const POUR_COLORS = {
  PERCEIVABLE:    CAT.teal,
  OPERABLE:       CAT.blue,
  UNDERSTANDABLE: CAT.purple,
  ROBUST:         CAT.orange
};

const MODULE_COLORS = [
  CAT.teal, CAT.blue, CAT.teal, CAT.blue,
  CAT.purple, CAT.orange, CAT.pink, CAT.teal, CAT.blue
];

// ── Styled components ────────────────────────────────────────────────────────

const GlobalFont = createGlobalStyle`
  button, input, select, textarea, [class*="rui__"] {
    font-family: ${FONT} !important;
  }

`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background: ${rdcUiTheme.color.bg.primary};
  font-family: ${FONT};
`;

// Hero / dashboard header
const HeroHeader = styled.header`
  display: flex;
  align-items: stretch;
  background: linear-gradient(135deg, #0B0B0B 9%, #0B0B0B 50%, #717171 93%);
  min-height: 500px;
  overflow: hidden;
`;

const HeroLeft = styled.div`
  flex: 1;
  padding: 32px 52px 32px 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding-right: 28px;
  }
`;

const HeroRight = styled.div`
  flex: 0 0 35%;
  overflow: hidden;
  position: relative;

  @media (max-width: 600px) {
    display: none;
  }
`;

const HeroIllustration = styled.img`
  position: absolute;
  width: 110%;
  height: 110%;
  object-fit: cover;
  object-position: left center;
  bottom: -5%;
  right: -5%;
`;

const HeroLogoWrap = styled.div`
  margin-bottom: 18px;
`;

const HeroTitle = styled.h1`
  font-size: ${rdcUiTheme.typography.scale.display800.size};
  font-weight: 600;
  line-height: ${rdcUiTheme.typography.scale.display800.lineHeight};
  letter-spacing: ${rdcUiTheme.typography.scale.display800.letterSpacing};
  color: ${rdcUiTheme.color.text.primaryReverse};
  margin: 0;
  font-family: ${FONT};
`;

const HeroSubtitle = styled.p`
  font-size: ${rdcUiTheme.typography.scale.body400.size};
  font-weight: ${rdcUiTheme.typography.scale.body400.fontWeight};
  line-height: ${rdcUiTheme.typography.scale.body400.lineHeight};
  color: ${rdcUiTheme.color.text.primaryReverse};
  margin: 12px 0 0;
  font-family: ${FONT};
  width: 100%;
`;

const HeroTagRow = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
`;

const HeroPill = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: #ffffff;
  color: ${rdcUiTheme.color.text.primary};
  border-radius: 40px;
  padding: 5px 14px;
  font-size: 13px;
  font-weight: 600;
  font-family: ${FONT};
`;

const HeroMeta = styled.span`
  color: #ffffff;
  font-size: 13px;
  font-family: ${FONT};
`;

const HeroMetaDot = styled.span`
  color: ${rdcUiTheme.color.text.primaryReverse};
`;

// Dashboard main
const DashMain = styled.main`
  padding: 56px;
`;


const InfoBannerWrap = styled.div`
  margin-bottom: 32px;
`;

const ProgressSection = styled.div`
  margin-bottom: 16px;
`;

const ProgressLabelRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: ${rdcUiTheme.color.text.primary};
  font-weight: 600;
  margin-bottom: 10px;
  font-family: ${FONT};
`;

const ModuleGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ModuleCardBtn = styled.button`
  background: ${rdcUiTheme.color.gray['50']};
  border-radius: 16px;
  padding: 32px;
  border: 1px solid ${rdcUiTheme.color.border.accent};
  cursor: ${p => p.$locked ? "default" : "pointer"};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 24px;
  text-align: left;
  width: 100%;
  transition: box-shadow 0.15s, border-color 0.15s;
  font-family: ${FONT};

  &:not([aria-disabled="true"]):hover {
    box-shadow: 0 4px 16px rgba(0,0,0,0.10);
    border-color: #1A1816;
  }

  &:focus-visible {
    outline: 3px solid ${CAT.blue.bold};
    outline-offset: 2px;
  }
`;

const CardContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const LockedTooltipWrapper = styled.div`
  position: relative;
  display: block;
  &:hover > [data-tooltip] {
    opacity: 1;
    pointer-events: auto;
  }
`;

const LockedTooltipBubble = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: #3b3b3b;
  color: #fff;
  border-radius: 8px;
  padding: 12px;
  width: 220px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s;
  z-index: 100;
  font-family: ${FONT};
  font-size: 13px;
  line-height: 20px;

  &::after {
    content: "";
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-top-color: #3b3b3b;
  }
`;

const LockedTooltipTitle = styled.span`
  display: block;
  font-weight: 600;
  margin-bottom: 4px;
`;

const LockedTooltipBody = styled.span`
  display: block;
  font-weight: 400;
`;

const CardTopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ModuleImageBox = styled.div`
  width: 80px;
  height: 80px;
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
  background: ${rdcUiTheme.color.bg.alternate};
  border: 1px solid ${rdcUiTheme.color.border.base};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;

  img {
    width: 80px;
    height: 80px;
    object-fit: contain;
  }
`;

const CardModuleNum = styled.div`
  font-size: ${rdcUiTheme.typography.scale.body200.size};
  line-height: ${rdcUiTheme.typography.scale.body200.lineHeight};
  font-weight: ${rdcUiTheme.typography.scale.body200.fontWeight};
  color: ${rdcUiTheme.color.text.secondary};
  font-family: ${FONT};
`;

const CardTitle = styled.div`
  font-size: ${rdcUiTheme.typography.scale.body400.size};
  line-height: ${rdcUiTheme.typography.scale.body400.lineHeight};
  font-weight: 600;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
`;




// Module reader
const ReaderWrapper = styled.div`
  min-height: 100vh;
  background: ${rdcUiTheme.color.bg.secondary};
  font-family: ${FONT};
`;

const ModuleNavBar = styled.header`
  display: flex;
  align-items: stretch;
  background: linear-gradient(135deg, #0B0B0B 9%, #0B0B0B 50%, #717171 93%);
  min-height: 260px;
  overflow: hidden;
`;

const ModuleNavLeft = styled.div`
  flex: 1;
  padding: 28px 52px 32px 56px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (max-width: 600px) {
    padding-right: 28px;
  }
`;

const ModuleNavRight = styled.div`
  flex: 0 0 42%;
  position: relative;

  @media (max-width: 600px) {
    display: none;
  }
`;

const ModuleNavIllustration = styled.img`
  position: absolute;
  height: 100%;
  width: auto;
  top: 0;
  right: -5%;
`;


const NavBarLabel = styled.div`
  color: ${rdcUiTheme.color.text.primaryReverse};
  font-size: ${rdcUiTheme.typography.scale.body300.size};
  font-family: ${FONT};
  margin-bottom: 6px;
`;

const NavBarTitle = styled.h2`
  color: ${rdcUiTheme.color.text.primaryReverse};
  font-weight: 600;
  font-size: ${rdcUiTheme.typography.scale.display700.size};
  line-height: ${rdcUiTheme.typography.scale.display700.lineHeight};
  letter-spacing: ${rdcUiTheme.typography.scale.display700.letterSpacing};
  font-family: ${FONT};
  margin: 0;

  &:focus { outline: none; }
  &:focus-visible {
    outline: 2px solid rgba(255,255,255,0.6);
    outline-offset: 2px;
  }
`;

const NavBarDone = styled.span`
  background: ${CAT.green.subtle};
  border-radius: 40px;
  padding: 4px 12px;
  color: ${CAT.green.bold};
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 6px;
  display: inline-block;
  font-family: ${FONT};
`;

const ReaderMain = styled.main`
  padding: 56px;
`;

// Step indicator
const StepRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 24px;
`;

const StepDot = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 600;
  font-family: ${FONT};
  background: ${p => p.$past ? rdcUiTheme.color.status.success : p.$active ? rdcUiTheme.color.interactive.primary.default.initial : rdcUiTheme.color.bg.secondary};
  border: 2px solid ${p => p.$past ? rdcUiTheme.color.status.success : p.$active ? rdcUiTheme.color.interactive.primary.default.initial : rdcUiTheme.color.border.base};
  color: ${p => (p.$past || p.$active) ? "#ffffff" : rdcUiTheme.color.interactive.primary.default.initial};
`;

const StepConnector = styled.div`
  flex: 1;
  height: 2px;
  margin: 0 4px;
  background: ${p => p.$past ? rdcUiTheme.color.status.success : rdcUiTheme.color.border.base};
`;

// Content card
const ContentCard = styled.div`
  background: ${rdcUiTheme.color.bg.primary};
  border-radius: 16px;
  padding: 40px;
  border: 1px solid ${rdcUiTheme.color.border.base};
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 20px;
  & h1, & h2, & h3, & h4, & h5, & h6 {
    margin-top: 0;
  }
`;

// Navigation
const NavRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  gap: 12px;
`;

const NavRight = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

// Section typography
const SH = styled.h3`
  font-weight: 600;
  font-size: 18px;
  color: ${rdcUiTheme.color.text.primary};
  margin-bottom: 14px;
  font-family: ${FONT};
  letter-spacing: -0.24px;
`;

const BodyText = styled.p`
  font-size: 15px;
  color: ${rdcUiTheme.color.text.primary};
  line-height: 1.75;
  font-family: ${FONT};
  margin: 0;
`;

const BodyStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

// Section: page-title
const PageTitleH2 = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: ${rdcUiTheme.color.text.primary};
  margin-bottom: 12px;
  letter-spacing: -0.24px;
  font-family: ${FONT};
`;

// Section: pour-intro
const PourIntroH2 = styled.h2`
  font-size: 32px;
  font-weight: 600;
  color: ${rdcUiTheme.color.text.primary};
  margin-bottom: 8px;
  font-family: ${FONT};
  letter-spacing: -0.5px;
`;

const PourIntroWrap = styled.div`
  padding-bottom: 8px;
  border-bottom: 1px solid ${rdcUiTheme.color.border.base};
`;

// Section: stat-grid
const StatGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
`;

const StatCard = styled.div`
  position: relative;
  background: ${rdcUiTheme.color.gray['50']};
  border-radius: 16px;
  border: 1px solid #D3CFCA;
  padding: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  overflow: visible;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  cursor: pointer;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
    border-color: #1A1816;
    z-index: 10;
  }
`;

const StatValue = styled.div`
  font-size: 42px;
  font-weight: 600;
  line-height: 40px;
  letter-spacing: -0.24px;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
  text-align: center;
  white-space: pre-line;
`;

const StatTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: #1A1816;
  color: #fff;
  border-radius: 8px;
  padding: 8px 14px;
  font-size: 14px;
  font-weight: 400;
  font-family: ${FONT};
  white-space: nowrap;
  text-align: center;
  z-index: 100;
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.18);
  animation: tooltipIn 0.15s ease;
  @keyframes tooltipIn {
    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #1A1816;
  }
`;


function parseStatValue(value) {
  const match = value.match(/^(.*[^\d.])?(\d[\d.]*)(\D*)$/);
  if (!match) return { prefix: value, num: null, suffix: '' };
  const num = parseFloat(match[2]);
  const decimals = match[2].includes('.') ? match[2].split('.')[1].length : 0;
  return { prefix: match[1] || '', num, suffix: match[3] || '', decimals };
}

function useCountUpValue(target, started, duration = 1400, resetKey = 0) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started || target === null) return;
    setCount(0);
    const decimals = target % 1 !== 0 ? String(target).split('.')[1].length : 0;
    const startTime = Date.now();
    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((ease * target).toFixed(decimals)));
      if (progress < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [started, target, duration, resetKey]);
  return count;
}

const DONUT_R = 80;
const DONUT_C = 2 * Math.PI * DONUT_R;

function DonutChart({ animated, display, hovered }) {
  const offset = DONUT_C * (1 - (animated / 100));
  return (
    <svg
      width="200" height="200" viewBox="0 0 200 200"
      style={{
        flexShrink: 0,
        transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        transform: hovered ? 'scale(1.1)' : 'scale(1)',
      }}
    >
      {/* Track */}
      <circle cx="100" cy="100" r={DONUT_R} fill="none" stroke="#D3CFCA" strokeWidth="20" />
      {/* White border behind red arc */}
      <circle
        cx="100" cy="100" r={DONUT_R}
        fill="none" stroke="white" strokeWidth="24" strokeLinecap="round"
        strokeDasharray={DONUT_C} strokeDashoffset={offset}
        transform="rotate(-90 100 100)"
      />
      {/* Red arc */}
      <circle
        cx="100" cy="100" r={DONUT_R}
        fill="none" stroke="#D92228" strokeWidth="20" strokeLinecap="round"
        strokeDasharray={DONUT_C} strokeDashoffset={offset}
        transform="rotate(-90 100 100)"
      />
      {/* Value inside */}
      <text
        x="100" y="100"
        textAnchor="middle" dominantBaseline="central"
        fontSize="32" fontWeight="600"
        fontFamily="Galano Grotesque Alt, system-ui, sans-serif"
        fill="#1A1816" letterSpacing="-0.24"
      >
        {display}
      </text>
    </svg>
  );
}

function AnimatedStatCard({ stat }) {
  const ref = useRef(null);
  const [started, setStarted] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hoverKey, setHoverKey] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const { prefix, num, suffix, decimals } = parseStatValue(stat.value);
  const count = useCountUpValue(num, started);
  const donutCount = useCountUpValue(stat.percent, started);
  const hoverDonutCount = useCountUpValue(stat.percent, hovered, 800, hoverKey);

  const display = num !== null
    ? `${prefix}${count.toFixed(decimals ?? 0)}${suffix}`
    : stat.value;

  return (
    <StatCard
      ref={ref}
      onMouseEnter={() => { setHovered(true); setHoverKey(k => k + 1); }}
      onMouseLeave={() => setHovered(false)}
    >
      <DonutChart
        animated={hovered ? hoverDonutCount : donutCount}
        display={display}
        hovered={hovered}
      />
      <StatLabel>{stat.label}</StatLabel>
      {hovered && (
        <StatTooltip>View source ↗</StatTooltip>
      )}
      <a
        href={stat.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{ position: 'absolute', inset: 0, borderRadius: 16 }}
        aria-label={stat.label}
      />
    </StatCard>
  );
}

// Section: spectrum
const SpectrumGrid = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const SpectrumCard = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 16px;
  border: 1px solid #D3CFCA;
  background: #F8F7F7;
  padding: 24px 16px;
`;

const SpectrumCardTitle = styled.div`
  color: ${rdcUiTheme.color.text.primary};
  text-align: center;
  font-family: ${FONT};
  font-size: ${rdcUiTheme.typography.scale.body400.size};
  font-weight: 500;
  line-height: ${rdcUiTheme.typography.scale.body400.lineHeight};
  white-space: nowrap;
`;

const SpectrumCardText = styled.div`
  color: ${rdcUiTheme.color.text.primary};
  text-align: center;
  font-family: ${FONT};
  font-size: ${rdcUiTheme.typography.scale.body200.size};
  font-weight: ${rdcUiTheme.typography.scale.body200.fontWeight};
  line-height: ${rdcUiTheme.typography.scale.body200.lineHeight};
  white-space: nowrap;
`;

// Section: guideline-cards
const GuidelineCardsIntro = styled.div`
  margin-bottom: 28px;
  font-family: ${FONT};
`;
const GuidelineCardsHeadingLink = styled.a`
  display: inline-block;
  font-size: 24px;
  font-weight: 600;
  color: ${rdcUiTheme.color.text.primary};
  text-decoration: none;
  margin-bottom: 12px;
  &:hover { text-decoration: underline; }
`;
const GuidelineCardsBody = styled.p`
  font-size: ${rdcUiTheme.typography.scale.body400.size};
  line-height: ${rdcUiTheme.typography.scale.body400.lineHeight};
  color: ${rdcUiTheme.color.text.primary};
  margin: 0 0 8px;
  font-family: ${FONT};
`;
const GuidelineCardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin: 24px 0;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;
const GuidelineCardWrap = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
`;
const GuidelineCardTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 12px);
  left: 50%;
  transform: translateX(-50%);
  background: #1A1816;
  color: #fff;
  font-family: ${FONT};
  font-size: 14px;
  font-weight: 400;
  padding: 8px 14px;
  border-radius: 8px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  z-index: 10;
  box-shadow: 0 4px 12px rgba(0,0,0,0.18);
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 6px solid transparent;
    border-top-color: #1A1816;
  }
  ${GuidelineCardWrap}:hover & {
    opacity: 1;
    animation: guidelineTooltipIn 0.15s ease;
  }
  @keyframes guidelineTooltipIn {
    from { opacity: 0; transform: translateX(-50%) translateY(4px); }
    to   { opacity: 1; transform: translateX(-50%) translateY(0); }
  }
`;
const GuidelineCardLink = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  border: 1px solid #D3CFCA;
  background: #F8F7F7;
  padding: 24px 16px;
`;
const GuidelineCardImg = styled.img`
  width: 100%;
  max-width: 140px;
  height: 100px;
  object-fit: contain;
`;
const GuidelineCardTitle = styled.div`
  color: ${rdcUiTheme.color.text.primary};
  text-align: center;
  font-family: ${FONT};
  font-size: ${rdcUiTheme.typography.scale.body400.size};
  font-weight: 600;
  line-height: ${rdcUiTheme.typography.scale.body400.lineHeight};
`;
const GuidelineCardDesc = styled.div`
  color: ${rdcUiTheme.color.text.primary};
  text-align: center;
  font-family: ${FONT};
  font-size: ${rdcUiTheme.typography.scale.body200.size};
  font-weight: ${rdcUiTheme.typography.scale.body200.fontWeight};
  line-height: ${rdcUiTheme.typography.scale.body200.lineHeight};
`;

// Section: pour-grid-rich
const PourRichStack = styled.div`
  display: grid;
  gap: 32px;
  grid-template-columns: repeat(auto-fit, minmax(420px, 1fr));

  @media (max-width: 460px) {
    grid-template-columns: 1fr;
  }
`;

const PourRichCard = styled.div`
  background: ${rdcUiTheme.color.gray['50']};
  border-radius: 16px;
  border: 1px solid #D3CFCA;
  overflow: hidden;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-width: 0;
`;

const PourRichContent = styled.div`
  flex: 1 1 0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const PourRichEyebrow = styled.div`
  color: #726A60;
  font-size: 12px;
  font-family: ${FONT};
  font-weight: 500;
  line-height: 16px;
`;

const PourRichTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const PourRichTitle = styled.div`
  color: #1A1816;
  font-size: 18px;
  font-family: ${FONT};
  font-weight: 500;
  line-height: 28px;
`;

const PourRichBody = styled.div`
  color: #1A1816;
  font-size: 14px;
  font-family: ${FONT};
  font-weight: 400;
  line-height: 20px;
`;

const PourRichImage = styled.img`
  width: 160px;
  align-self: stretch;
  object-fit: cover;
  flex-shrink: 0;
  display: block;
`;

// Section: levels-rich / levels
const LevelsRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

const LevelCard = styled.div`
  flex: 1 1 140px;
  border: 1px solid ${p => p.$color};
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
  padding: 16px;
  text-align: center;
`;

const LevelNum = styled.div`
  font-weight: 600;
  font-size: 20px;
  color: ${p => p.$color};
  margin-bottom: 6px;
  font-family: ${FONT};
`;

const LevelDesc = styled.div`
  font-size: 12px;
  color: ${rdcUiTheme.color.text.secondary};
  line-height: 1.5;
  font-family: ${FONT};
`;

// Section: levels-rich (new design)
const RichLevelsRow = styled.div`
  display: flex;
  gap: 32px;
  align-items: flex-end;
  justify-content: center;
  flex-wrap: nowrap;
  width: 100%;
  margin-bottom: 24px;
  @media (max-width: 820px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

const richCardIn = keyframes`
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const ping = keyframes`
  75%, 100% { transform: scale(2.2); opacity: 0; }
`;

const PulseDot = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  width: 10px;
  height: 10px;
  pointer-events: none;
  z-index: 10;
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: ${rdcUiTheme.color.interactive.primary.default.initial};
    animation: ${ping} 1.4s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
  }
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: ${rdcUiTheme.color.interactive.primary.default.initial};
  }
`;

const RichLevelWrapper = styled.div`
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 820px) {
    display: flex;
    align-items: stretch;
  }
`;

const RichCardAnimator = styled.div`
  opacity: 0;
  transform: translateY(40px);
  ${p => p.$animate && css`
    animation: ${richCardIn} 1.4s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: ${p.$delay}ms;
  `}
`;

const RichLevelTooltip = styled.div`
  position: absolute;
  top: -36px;
  left: 50%;
  transform: translateX(-50%);
  background: #1A1816;
  color: #fff;
  font-family: ${FONT};
  font-size: 13px;
  font-weight: 600;
  line-height: 1;
  padding: 6px 12px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.15s ease;
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border: 5px solid transparent;
    border-top-color: #1A1816;
  }
  ${RichLevelWrapper}:hover & {
    opacity: 1;
  }
`;

const RichLevelCard = styled.div`
  display: flex;
  flex: 1;
  min-width: 240px;
  height: ${p => p.$height}px;
  padding: 32px;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 16px;
  border: 1px solid #D3CFCA;
  background: #F8F7F7;
  @media (max-width: 820px) {
    width: 100%;
    height: auto;
    min-height: unset;
  }
`;

const RichLevelIllustration = styled.img`
  max-width: 100%;
  max-height: 160px;
  object-fit: contain;
`;

const RichLevelTopGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;

const RichLevelLabel = styled.div`
  color: #1A1816;
  text-align: center;
  font-family: ${FONT};
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0;
`;

const RichLevelDesc = styled.div`
  color: #1A1816;
  text-align: center;
  font-family: ${FONT};
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0;
`;

const InfoNote = styled.div`
  background: #FFFBEB;
  border: 1px solid #FCD34D;
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
  padding: 10px 14px;
  font-size: 13px;
  color: #92400E;
  font-family: ${FONT};
`;

// Section: wcag-guidelines
const GuidelinesStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const GuidelineCatName = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: ${rdcUiTheme.color.text.secondary};
  margin-bottom: 16px;
  font-family: ${FONT};
`;

const GuidelineItem = styled.div`
  border-top: 1px solid ${rdcUiTheme.color.border.base};
  padding-top: 16px;
  padding-bottom: 16px;
`;

const GuidelineItemHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 8px;
`;

const GuidelineItemTitle = styled.h4`
  font-size: 15px;
  font-weight: 600;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
  margin: 0;
`;

const GuidelineLevels = styled.div`
  display: flex;
  gap: 4px;
  flex-shrink: 0;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const GuidelineTags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 10px;
`;

const WcagTagSpan = styled.span`
  background: ${CAT.blue.subtle};
  color: ${CAT.blue.bold};
  font-size: 12px;
  line-height: 16px;
  border-radius: ${rdcUiTheme.size.borderRadius['100']};
  padding: 2px 8px;
  font-family: ${FONT};
  font-weight: 400;
`;

const LevelBadgeSpan = styled.span`
  background: ${p => p.$subtle};
  color: ${p => p.$bold};
  font-size: 11px;
  border-radius: 40px;
  padding: 2px 10px;
  font-family: ${FONT};
  font-weight: 600;
  border: 1px solid ${p => p.$bold};
`;

const GuidelineBody = styled.p`
  font-size: 13px;
  color: ${rdcUiTheme.color.text.primary};
  line-height: 1.65;
  font-family: ${FONT};
  margin: 0;
`;

// Section: guideline-detail
const GDHeading = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
  margin: 0 0 16px;
`;
const GDIntro = styled.p`
  font-size: 18px;
  color: ${rdcUiTheme.color.text.primary};
  line-height: 1.65;
  font-family: ${FONT};
  margin: 0 0 24px;
`;
const GDDivider = styled.hr`
  border: none;
  border-top: 1px solid ${rdcUiTheme.color.border.base};
  margin: 0 0 24px;
`;
const GDSuccessLabel = styled.div`
  font-size: 14px;
  color: ${rdcUiTheme.color.text.secondary};
  font-family: ${FONT};
  margin-bottom: 10px;
`;
const GDCriterionTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
  margin: 0 0 8px;
`;
const GDTagRow = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  margin-bottom: 14px;
`;
const GDTagLink = styled.a`
  background: ${CAT.blue.subtle};
  color: ${CAT.blue.bold};
  font-size: 12px;
  line-height: 16px;
  border-radius: ${rdcUiTheme.size.borderRadius['100']};
  padding: 2px 8px;
  font-family: ${FONT};
  font-weight: 400;
  text-decoration: underline;
`;
const GDBody = styled.p`
  font-size: 18px;
  color: ${rdcUiTheme.color.text.primary};
  line-height: 1.65;
  font-family: ${FONT};
  margin: 0 0 12px;
`;
const GDExamplesIntro = styled.p`
  font-size: 18px;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
  margin: 0 0 36px;
`;
const GDExCard = styled.div`
  border: 1px solid ${rdcUiTheme.color.border.base};
  border-radius: 12px;
  padding: 20px;
`;
const GDExCounter = styled.div`
  font-size: 13px;
  color: ${rdcUiTheme.color.text.secondary};
  font-family: ${FONT};
  margin-bottom: 10px;
`;
const GDExTitle = styled.h5`
  font-size: 18px;
  font-weight: 600;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
  margin: 0 0 6px;
`;
const GDExDesc = styled.p`
  font-size: 18px;
  color: ${rdcUiTheme.color.text.primary};
  line-height: 1.5;
  font-family: ${FONT};
  margin: 0 0 16px;
`;
const ExImagePair = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  @media (max-width: 400px) {
    flex-direction: column;
    align-items: center;
  }
`;
const ExImageDivider = styled.div`
  width: 1px;
  align-self: stretch;
  background: ${rdcUiTheme.color.border.accent};
  flex-shrink: 0;
  margin: 0 48px;
  @media (max-width: 400px) {
    width: 100%;
    height: 1px;
    margin: 24px 0;
    align-self: auto;
  }
`;
const GDExPanesRow = styled.div`
  display: flex;
  gap: 32px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

// Section: img placeholder
const ImgPlaceholderWrap = styled.div`
  border: 2px dashed ${rdcUiTheme.color.border.base};
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
  background: ${rdcUiTheme.color.bg.secondary};
  height: 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${rdcUiTheme.color.text.secondary};
  font-size: 13px;
  gap: 6px;
  margin: 12px 0 0;
  font-family: ${FONT};
`;

// Section: plugin-cards
const PluginGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 10px;
`;

const PluginCard = styled.div`
  background: ${rdcUiTheme.color.bg.secondary};
  border: 1px solid ${rdcUiTheme.color.border.base};
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
  padding: 14px;
`;

const PluginIcon = styled.div`
  font-size: 22px;
  margin-bottom: 6px;
`;

const PluginName = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${rdcUiTheme.color.text.primary};
  margin-bottom: 4px;
  font-family: ${FONT};
`;

const PluginUse = styled.div`
  font-size: 12px;
  color: ${rdcUiTheme.color.text.secondary};
  line-height: 1.5;
  font-family: ${FONT};
`;

// Section: annotation-guide
const AnnotationList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const AnnotationItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 10px 14px;
  background: ${rdcUiTheme.color.bg.secondary};
  border: 1px solid ${rdcUiTheme.color.border.base};
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
`;

const AnnotationIcon = styled.span`
  font-size: 18px;
  flex-shrink: 0;
`;

const AnnotationLabel = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
`;

const AnnotationDesc = styled.div`
  font-size: 12px;
  color: ${rdcUiTheme.color.text.secondary};
  font-family: ${FONT};
`;

// Section: naming-guide
const NamingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
`;

const NamingHeader = styled.div`
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  font-family: ${FONT};
`;

const NamingCell = styled.div`
  background: ${p => p.$bg};
  border: 1px solid ${p => p.$border};
  border-radius: ${rdcUiTheme.size.borderRadius['100']};
  padding: 8px 10px;
  font-size: 12px;
  font-family: monospace;
  color: ${p => p.$color};
`;

// Section: storybook-guide
const StepGuideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StepGuideItem = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  padding: 12px 14px;
  background: ${rdcUiTheme.color.bg.secondary};
  border: 1px solid ${rdcUiTheme.color.border.base};
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
`;

const StepGuideNum = styled.div`
  width: 32px;
  height: 32px;
  background: #4A4A4A;
  border-radius: ${rdcUiTheme.size.borderRadius['100']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 12px;
  color: #ffffff;
  flex-shrink: 0;
  font-family: ${FONT};
`;

const StepGuideTitle = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: ${rdcUiTheme.color.text.primary};
  margin-bottom: 2px;
  font-family: ${FONT};
`;

const StepGuideDesc = styled.div`
  font-size: 13px;
  color: ${rdcUiTheme.color.text.secondary};
  font-family: ${FONT};
`;

// Section: do-dont
const DoDontGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const DoDontRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
`;

const UsageCard = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const CardStatusBar = styled.div`
  height: 4px;
  background: ${p => p.$color};
  flex-shrink: 0;
`;

const CardBody = styled.div`
  background: #f8f8f8;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  border-radius: 0 0 ${rdcUiTheme.size.borderRadius['300']} ${rdcUiTheme.size.borderRadius['300']};
  overflow: hidden;
`;

const CardPlaceholder = styled.div`
  background: #8c8c8c;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;

const CardPlaceholderLabel = styled.p`
  color: white;
  font-family: ${FONT};
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  letter-spacing: -0.24px;
  margin: 0;
  white-space: nowrap;
`;

// Section: pour-grid (compact)
const PourCompactStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const PourCompactItem = styled.div`
  display: flex;
  gap: 14px;
  align-items: flex-start;
  background: ${rdcUiTheme.color.bg.primary};
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
  padding: 14px 16px;
  border: 1px solid ${p => p.$subtle};
`;

const PourCompactLetter = styled.div`
  width: 34px;
  height: 34px;
  background: ${p => p.$bold};
  border-radius: ${rdcUiTheme.size.borderRadius['100']};
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 16px;
  color: #ffffff;
  flex-shrink: 0;
  font-family: ${FONT};
`;

const PourCompactWord = styled.div`
  font-weight: 600;
  font-size: 14px;
  color: ${p => p.$bold};
  margin-bottom: 2px;
  font-family: ${FONT};
`;

const PourCompactDesc = styled.div`
  font-size: 13px;
  color: ${rdcUiTheme.color.text.secondary};
  margin-bottom: 3px;
  font-family: ${FONT};
`;

const PourCompactExample = styled.div`
  font-size: 12px;
  color: ${p => p.$bold};
  font-style: italic;
  font-family: ${FONT};
  font-weight: 600;
`;

// Section: resources
const ResourcesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ResourceLink = styled.a`
  display: flex;
  gap: 12px;
  padding: 12px 14px;
  background: ${rdcUiTheme.color.bg.secondary};
  border: 1px solid ${rdcUiTheme.color.border.base};
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
  text-decoration: none;
  align-items: center;

  &:focus-visible {
    outline: 3px solid ${CAT.blue.bold};
    outline-offset: 2px;
  }
`;

const ResourceIcon = styled.span`
  font-size: 18px;
`;

const ResourceTitle = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
`;

const ResourceDesc = styled.div`
  font-size: 12px;
  color: ${rdcUiTheme.color.text.secondary};
  font-family: ${FONT};
`;

// Section: curb-cut
const BulletList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BulletItem = styled.div`
  display: flex;
  gap: 10px;
  align-items: flex-start;
`;

const BulletDot = styled.span`
  color: ${rdcUiTheme.color.text.secondary};
  flex-shrink: 0;
  margin-top: 2px;
`;

const BulletText = styled.span`
  font-size: 14px;
  color: ${rdcUiTheme.color.text.primary};
  line-height: 1.65;
  font-family: ${FONT};
`;

// Criteria accordion body
const CriteriaList = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${rdcUiTheme.color.border.base};
`;

const CriteriaRow = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px 16px;
  align-items: flex-start;
  border-bottom: ${p => p.$last ? "none" : `1px solid ${rdcUiTheme.color.border.base}`};
  background: ${rdcUiTheme.color.bg.primary};
`;

const CriteriaId = styled.span`
  font-family: monospace;
  font-size: 11px;
  background: ${p => p.$bold};
  color: #ffffff;
  border-radius: ${rdcUiTheme.size.borderRadius['100']};
  padding: 2px 6px;
  flex-shrink: 0;
  margin-top: 2px;
  white-space: nowrap;
`;

const CriteriaName = styled.div`
  font-weight: 600;
  font-size: 13px;
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
`;

const CriteriaDesc = styled.div`
  font-size: 12px;
  color: ${rdcUiTheme.color.text.secondary};
  font-family: ${FONT};
  line-height: 1.5;
`;

// Quiz
const QuizCard = styled.div`
  background: ${rdcUiTheme.color.bg.primary};
  border: 1px solid ${rdcUiTheme.color.border.base};
  border-radius: 16px;
  padding: 24px;
  font-family: ${FONT};
`;

const QuizQuestion = styled.p`
  font-size: ${p => p.$recap ? rdcUiTheme.typography.scale.body300.size : rdcUiTheme.typography.scale.body400.size};
  font-weight: ${p => p.$recap ? 500 : 600};
  line-height: ${p => p.$recap ? rdcUiTheme.typography.scale.body300.lineHeight : rdcUiTheme.typography.scale.body400.lineHeight};
  color: ${rdcUiTheme.color.text.primary};
  font-family: ${FONT};
  margin: 12px 0 16px;
`;

const PickerGroup = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: 1fr;
  @media (min-width: 600px) {
    grid-template-columns: 1fr 1fr;
  }
  @media (min-width: 1400px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

const PickerCard = styled.label`
  position: relative;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border: 1px solid ${p => p.$correct ? rdcUiTheme.color.status.success : p.$selected ? rdcUiTheme.color.text.primary : rdcUiTheme.color.border.accent};
  border-radius: 12px;
  background: ${p => p.$correct ? rdcUiTheme.color.status.successSubtle : rdcUiTheme.color.bg.primary};
  cursor: ${p => p.$disabled ? 'default' : 'pointer'};
  font-family: ${FONT};
  font-size: ${rdcUiTheme.typography.scale.body200.size};
  line-height: ${rdcUiTheme.typography.scale.body200.lineHeight};
  font-weight: ${p => p.$correct ? 500 : 400};
  color: ${p => p.$correct ? rdcUiTheme.color.status.success : rdcUiTheme.color.text.primary};
  transition: border-color 0.15s, background 0.15s, color 0.15s;
  &:hover { border-color: ${p => !p.$disabled && !p.$correct && (p.$selected ? rdcUiTheme.color.text.primary : rdcUiTheme.color.border.accent)}; }
`;

const PickerCircle = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  flex-shrink: 0;
  background: ${p => p.$correct ? rdcUiTheme.color.status.success : p.$selected ? rdcUiTheme.color.text.primary : 'transparent'};
  border: 1px solid ${p => p.$correct ? rdcUiTheme.color.status.success : p.$selected ? rdcUiTheme.color.text.primary : rdcUiTheme.color.border.accent};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HiddenRadio = styled.input.attrs({ type: 'radio' })`
  position: absolute;
  opacity: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
  white-space: nowrap;
`;

const QuizActions = styled.div`
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const WrongAlert = styled.p`
  font-size: 13px;
  color: ${CAT.red.bold};
  font-family: ${FONT};
  margin-bottom: 10px;
  font-weight: 500;
`;

const ExplanationBox = styled.div`
  background: ${rdcUiTheme.color.bg.secondary};
  border-radius: ${rdcUiTheme.size.borderRadius['200']};
  padding: 12px 16px;
  font-size: 14px;
  color: ${rdcUiTheme.color.text.primary};
  line-height: 1.6;
  border: 1px solid ${rdcUiTheme.color.border.base};
  font-family: ${FONT};
  margin-top: 16px;
`;

const CorrectText = styled.span`
  font-weight: 600;
  color: ${CAT.green.bold};
`;

// Checklist
const ChecklistHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const ChecklistCount = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${p => p.$done ? CAT.green.bold : rdcUiTheme.color.text.secondary};
  font-family: ${FONT};
`;

const ChecklistProgress = styled.div`
  margin-bottom: 16px;
`;

const ChecklistCatName = styled.div`
  font-weight: 600;
  font-size: 12px;
  color: ${rdcUiTheme.color.text.secondary};
  margin-bottom: 8px;
  font-family: ${FONT};
`;

// All-done screen
const AllDoneWrapper = styled.div`
  min-height: 100vh;
  background: ${rdcUiTheme.color.bg.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  font-family: ${FONT};
`;

const AllDoneCard = styled.div`
  background: ${rdcUiTheme.color.bg.primary};
  border-radius: 16px;
  padding: 48px;
  text-align: center;
  max-width: 480px;
  border: 1px solid ${rdcUiTheme.color.border.base};
`;

const AllDoneEmoji = styled.div`
  font-size: 56px;
  margin-bottom: 16px;
`;

const AllDoneTitle = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: ${rdcUiTheme.color.text.primary};
  margin-bottom: 12px;
  font-family: ${FONT};
`;

const AllDoneBody = styled.p`
  font-size: 15px;
  color: ${rdcUiTheme.color.text.secondary};
  line-height: 1.7;
  margin-bottom: 24px;
  font-family: ${FONT};
`;

// ── Helper components ─────────────────────────────────────────────────────────

function HavenLogo({ height = 28 }) {
  return (
    <img
      src={LOGO_IMG}
      alt="Haven"
      height={height}
      style={{ display: "block" }}
      onError={e => { e.target.style.display = "none"; }}
    />
  );
}

function ImgPlaceholder() {
  return (
    <ImgPlaceholderWrap>
      <span aria-hidden="true" style={{ fontSize: 24 }}>🖼️</span>
      <span>Image placeholder</span>
    </ImgPlaceholderWrap>
  );
}

function WcagTag({ label }) {
  return <WcagTagSpan>{label}</WcagTagSpan>;
}

function LevelBadge({ level }) {
  const map = { A: CAT.red, AA: CAT.blue, AAA: CAT.green };
  const c = map[level] || CAT.red;
  return <LevelBadgeSpan $bold={c.bold} $subtle={c.subtle}>{level} level</LevelBadgeSpan>;
}

function StepIndicator({ total, current }) {
  return (
    <StepRow role="list" aria-label="Module progress">
      {Array.from({ length: total }).map((_, i) => {
        const isPast   = i < current;
        const isActive = i === current;
        return (
          <div key={i} role="listitem" style={{ display: "flex", alignItems: "center", flex: i < total - 1 ? 1 : "none" }}>
            <StepDot
              $past={isPast}
              $active={isActive}
              aria-label={isPast ? `Step ${i + 1} complete` : isActive ? `Step ${i + 1} current` : `Step ${i + 1}`}
              aria-current={isActive ? "step" : undefined}
            >
              {isPast ? "✓" : i + 1}
            </StepDot>
            {i < total - 1 && <StepConnector $past={isPast} />}
          </div>
        );
      })}
    </StepRow>
  );
}

// ── AccordionCriteria   replaces AccordionGroup, uses rdc-ui Accordion ────────

function AccordionCriteria({ s, acc }) {
  return (
    <div>
      <SH>{s.heading}</SH>
      <div>
        {s.groups.map((group, gi) => {
          const gc    = POUR_COLORS[group.label] || acc;
          const label = group.label.charAt(0) + group.label.slice(1).toLowerCase();
          return (
            <Accordion
              key={gi}
              title={label}
              tags={[{ text: group.items.length + " criteria", dataColor: "blue" }]}
              size="lg"
            >
              <CriteriaList>
                {group.items.map((item, ii) => (
                  <CriteriaRow key={ii} $last={ii === group.items.length - 1}>
                    <CriteriaId $bold={gc.bold}>{item.id}</CriteriaId>
                    <div>
                      <CriteriaName>{item.name}</CriteriaName>
                      <CriteriaDesc>{item.desc}</CriteriaDesc>
                    </div>
                  </CriteriaRow>
                ))}
              </CriteriaList>
            </Accordion>
          );
        })}
      </div>
    </div>
  );
}

// ── ChecklistModule   uses rdc-ui FormControlSet + FormControlLabel + Checkbox ─

function ChecklistModule({ s }) {
  const [checked, setChecked] = useState({});
  const all  = s.categories.reduce((a, c) => a.concat(c.items), []);
  const done = Object.values(checked).filter(Boolean).length;

  function toggle(key) {
    setChecked(prev => ({ ...prev, [key]: !prev[key] }));
  }

  return (
    <Form>
    <div>
      <ChecklistHeader>
        <SH>{s.heading}</SH>
        <ChecklistCount $done={done === all.length}>{done}/{all.length}</ChecklistCount>
      </ChecklistHeader>
      <ChecklistProgress>
        <ProgressMeter
          id="checklist-progress"
          value={all.length > 0 ? Math.round((done / all.length) * 100) : 0}
          valueText={`${done} of ${all.length} items checked`}
          progressBarProps={{ style: { backgroundColor: rdcUiTheme.color.border.base } }}
        />
      </ChecklistProgress>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {s.categories.map((cat, ci) => {
          const catKey = `cat-${ci}`;
          return (
            <div key={ci}>
              <ChecklistCatName>{cat.name}</ChecklistCatName>
              <FormControlSet
                id={`checklist-${ci}`}
                legend={cat.name}
                direction="column"
              >
                {cat.items.map((item, ii) => {
                  const key  = `${ci}-${ii}`;
                  const isChecked = !!checked[key];
                  return (
                    <FormControlLabel
                      key={ii}
                      checked={isChecked}
                      control={<Checkbox />}
                      id={`check-${ci}-${ii}`}
                      name={catKey}
                      onChange={() => toggle(key)}
                      value={key}
                    >
                      <span style={{ textDecoration: isChecked ? "line-through" : "none" }}>
                        {item}
                      </span>
                    </FormControlLabel>
                  );
                })}
              </FormControlSet>
            </div>
          );
        })}
      </div>
    </div>
    </Form>
  );
}

// ── QuizBlock   uses rdc-ui FormControlSet + FormControlLabel + Radio ──────────

function QuizBlock({ quiz: quizInput, attempt, onComplete, isReadOnly, prevButton }) {
  const questions = Array.isArray(quizInput) ? quizInput : [quizInput];

  const [qIdx,      setQIdx]      = useState(0);
  const [selected,  setSelected]  = useState(null);
  const [showVal,   setShowVal]   = useState(false);
  const [wasWrong,  setWasWrong]  = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [answers,   setAnswers]   = useState([]);

  const quiz      = questions[qIdx];
  const isLast    = qIdx === questions.length - 1;
  const groupName = `quiz-${attempt}-${qIdx}`;

  if (isReadOnly) {
    return (
      <QuizCard>
        <Tag dataColor="blueSubtle" style={{ fontFamily: FONT }}>Knowledge check</Tag>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32, marginTop: 16 }}>
          {questions.map((q, qi) => (
            <div key={qi} style={{
              padding: 32,
              border: `1px solid ${rdcUiTheme.color.border.accent}`,
              borderRadius: 16,
              background: rdcUiTheme.color.gray['50'],
            }}>
              <p style={{ fontFamily: FONT, fontSize: rdcUiTheme.typography.scale.body300.size, fontWeight: 600, lineHeight: rdcUiTheme.typography.scale.body300.lineHeight, color: rdcUiTheme.color.text.primary, margin: '0 0 4px' }}>
                Question {qi + 1}:
              </p>
              <QuizQuestion $recap id={`quiz-ro-q-${attempt}-${qi}`} style={{ marginTop: 0 }}>{q.question}</QuizQuestion>
              <PickerGroup role="radiogroup" aria-labelledby={`quiz-ro-q-${attempt}-${qi}`}>
                {q.options.map((opt, i) => (
                  <PickerCard key={i} $correct={i === q.answer} $disabled>
                    <HiddenRadio
                      name={`quiz-ro-${attempt}-${qi}`}
                      value={String(i)}
                      checked={i === q.answer}
                      disabled
                      onChange={() => {}}
                    />
                    <PickerCircle $correct={i === q.answer} aria-hidden="true">
                      {i === q.answer && (
                        <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                          <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </PickerCircle>
                    <span>{opt}</span>
                  </PickerCard>
                ))}
              </PickerGroup>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginTop: 16 }}>
                <PickerCircle $correct aria-hidden="true" style={{ flexShrink: 0 }}>
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </PickerCircle>
                <span style={{ fontFamily: FONT, fontSize: rdcUiTheme.typography.scale.body200.size, lineHeight: rdcUiTheme.typography.scale.body200.lineHeight, color: rdcUiTheme.color.text.primary }}>
                  {q.explanation}
                </span>
              </div>
            </div>
          ))}
        </div>
      </QuizCard>
    );
  }

  function handleSubmit() {
    if (selected === null) { setShowVal(true); return; }
    if (selected === quiz.answer) {
      setAnswers(prev => { const n = [...prev]; n[qIdx] = selected; return n; });
      setSubmitted(true);
      setWasWrong(false);
      if (isLast) onComplete(selected);
    } else {
      setWasWrong(true);
      setShowVal(false);
    }
  }

  function handleNext() {
    const nextIdx = qIdx + 1;
    setQIdx(nextIdx);
    if (answers[nextIdx] !== undefined) {
      setSelected(answers[nextIdx]);
      setSubmitted(true);
    } else {
      setSelected(null);
      setSubmitted(false);
    }
    setWasWrong(false);
    setShowVal(false);
  }

  function handlePrevQuestion() {
    const prevIdx = qIdx - 1;
    setQIdx(prevIdx);
    setSelected(answers[prevIdx]);
    setSubmitted(true);
    setWasWrong(false);
    setShowVal(false);
  }

  return (
    <>
      <QuizCard>
        <Tag dataColor="blueSubtle" style={{ fontFamily: FONT }}>Knowledge check</Tag>
        {questions.length > 1 && (
          <div style={{ fontSize: 13, color: rdcUiTheme.color.text.secondary, fontFamily: FONT, marginTop: 4, marginBottom: 8 }}>
            Question {qIdx + 1} of {questions.length}
          </div>
        )}
        <QuizQuestion id={`quiz-q-${attempt}-${qIdx}`}>{quiz.question}</QuizQuestion>
        <PickerGroup role="radiogroup" aria-labelledby={`quiz-q-${attempt}-${qIdx}`}>
          {quiz.options.map((opt, i) => (
            <PickerCard key={i} $selected={selected === i} $correct={selected === i && submitted} $disabled={submitted} htmlFor={`${groupName}-${i}`}>
              <HiddenRadio
                id={`${groupName}-${i}`}
                name={groupName}
                value={String(i)}
                checked={selected === i}
                disabled={submitted}
                onChange={() => {
                  if (!submitted) { setSelected(i); setWasWrong(false); setShowVal(false); }
                }}
              />
              <PickerCircle $selected={selected === i} $correct={selected === i && submitted} aria-hidden="true">
                {selected === i && !submitted && (
                  <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'white' }} />
                )}
                {selected === i && submitted && (
                  <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                    <path d="M1 5L4.5 8.5L11 1.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </PickerCircle>
              <span>{opt}</span>
            </PickerCard>
          ))}
        </PickerGroup>
        {showVal && (
          <InlineMessage styleType="error" showIcon style={{ marginTop: 12, fontFamily: FONT }}>
            Please select an answer before submitting.
          </InlineMessage>
        )}
        {wasWrong && (
          <InlineMessage styleType="error" showIcon style={{ marginTop: 12, fontFamily: FONT }}>
            Not quite. Please try again.
          </InlineMessage>
        )}
        {submitted && (
          <InlineMessage styleType="success" showIcon style={{ marginTop: 16, fontFamily: FONT }}>
            <strong>Correct! </strong>{quiz.explanation}
          </InlineMessage>
        )}
      </QuizCard>

      <NavRow>
        <div>{(!submitted || !isLast) ? prevButton || null : null}</div>
        <NavRight>
          {qIdx > 0 && !isLast && (
            <Button styleType="SecondaryDefault" onClick={handlePrevQuestion}>
              Previous question
            </Button>
          )}
          {!submitted ? (
            <Button styleType="PrimaryDefault" onClick={handleSubmit}>
              Submit answer
            </Button>
          ) : (
            !isLast && (
              <Button styleType="PrimaryDefault" onClick={handleNext}>
                Next question
              </Button>
            )
          )}
        </NavRight>
      </NavRow>
    </>
  );
}

// ── Para helper ───────────────────────────────────────────────────────────────

function Para({ para }) {
  if (typeof para === "string") return <BodyText>{para}</BodyText>;
  return (
    <BodyText>
      {para.parts.map((seg, si) => {
        if (typeof seg === "string") return <span key={si}>{seg}</span>;
        if (seg.href) return (
          <a
            key={si}
            href={seg.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`${seg.text} (opens in new tab)`}
            style={{ color: rdcUiTheme.color.status.info, fontWeight: 400, textDecoration: "underline" }}
          >
            {seg.text}
          </a>
        );
        return (
          <span key={si} style={{ fontStyle: seg.italic ? "italic" : undefined, fontWeight: seg.semibold ? 600 : undefined }}>
            {seg.text}
          </span>
        );
      })}
    </BodyText>
  );
}

// ── Cost chart ────────────────────────────────────────────────────────────────

function CostChart() {
  const svgRef = useRef(null);
  const [started, setStarted] = useState(false);
  const [hoveredDot, setHoveredDot] = useState(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => { setStarted(e.isIntersecting); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const F  = 'Galano Grotesque Alt, system-ui, sans-serif';
  const TC = rdcUiTheme.color.text.primary;
  const DASH = 600;

  const fi = (delay, duration = 0.45) => ({
    opacity: started ? 1 : 0,
    transition: `opacity ${duration}s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
  });

  // 6-point curve: Requirements → Design (small dot) → Development → 9.5 → Testing → Production
  const segs = [
    { d: 'M100,295 C143,283 185,275 230,258', color: '#1565C0', delay: 0   },
    { d: 'M230,258 C275,241 323,217 370,195', color: '#2E7D32', delay: 0.5 },
    { d: 'M370,195 C393,184 418,173 440,162', color: '#E0A800', delay: 1.0 },
    { d: 'M440,162 C462,151 488,137 510,125', color: '#D06000', delay: 1.45},
    { d: 'M510,125 C555,101 597,74  640,48',  color: '#D92228', delay: 1.9 },
  ];

  // textFill: text primary for all except red (37.5 stays white)
  const dots = [
    { x:100, y:295, r:7,  filled:true,  color:'#1565C0', label:null,   textFill:'white', delay:0.1,  tooltip: null },
    { x:230, y:258, r:7,  filled:true,  color:'#2E7D32', label:null,   textFill:'white', delay:0.55, tooltip: null },
    { x:370, y:195, r:32, filled:false, color:'#2E7D32', label:'3X',   textFill:rdcUiTheme.color.text.primaryReverse, delay:0.8,  tooltip: "A developer spends 3 hours fixing what would've taken 1 hour to change in Figma." },
    { x:440, y:162, r:32, filled:false, color:'#E0A800', label:'9.5X', textFill:TC,      delay:1.25, tooltip: "That same 1-hour design fix now takes nearly 10 hours across design and dev to fix." },
    { x:510, y:125, r:32, filled:false, color:'#D06000', label:'15.5X',textFill:TC,      delay:1.65, tooltip: "A QA team found it. Now design, dev, and testing all have to loop back. 15+ hours gone." },
    { x:640, y:48,  r:32, filled:false, color:'#D92228', label:'37.5X',textFill:'white', delay:2.1,  tooltip: "Real users hit the issue. It takes 37 hours of work to fix what you could've solved in one." },
  ];

  const xLabels = [
    { x: 100, text: 'Requirements' },
    { x: 230, text: 'Design'       },
    { x: 370, text: 'Development'  },
    { x: 510, text: 'Testing'      },
    { x: 640, text: 'Production'   },
  ];

  const TS = rdcUiTheme.color.text.secondary;

  return (
    <div style={{ width: '100%', maxWidth: 900, margin: '0 auto' }}>
      <svg
        ref={svgRef}
        viewBox="0 -12 720 408"
        width="100%"
        style={{ display: 'block', overflow: 'visible' }}
        role="img"
        aria-label="Exponential cost chart: fixing an accessibility issue at Design costs 3 hours, Development 9.5, Testing 15.5, Production 37.5 hours. 67% of defects originate in design."
      >
        {/* Axes   meet cleanly at corner (70,315) */}
        <line x1="70" y1="10" x2="70"  y2="315" stroke={rdcUiTheme.color.border.secondary} strokeWidth="0.5" />
        <line x1="70" y1="315" x2="710" y2="315" stroke={rdcUiTheme.color.border.secondary} strokeWidth="0.5" />

        {/* Y axis label   body300 semibold primary */}
        <text
          transform="rotate(-90 24 175)"
          x="24" y="175"
          textAnchor="middle"
          fontSize="16" fontWeight="500"
          fill={TC} fontFamily={F}
          style={fi(0.1)}
        >Cost (hours)</text>

        {/* X axis label   body300 medium primary */}
        <text
          x="380" y="378"
          textAnchor="middle"
          fontSize="16" fontWeight="500"
          fill={TC} fontFamily={F}
          style={fi(0.1)}
        >Time</text>

        {/* Animated curve segments */}
        {segs.map((seg, i) => (
          <path
            key={i}
            d={seg.d}
            fill="none"
            stroke={seg.color}
            strokeWidth="5"
            strokeLinecap="round"
            style={{
              strokeDasharray: DASH,
              strokeDashoffset: started ? 0 : DASH,
              transition: `stroke-dashoffset 0.75s cubic-bezier(0.4,0,0.2,1) ${seg.delay}s`,
            }}
          />
        ))}

        {/* Arrow exiting Production circle at ~-31°, tip aligned to x-axis end (x=710) */}
        <g style={fi(2.2)}>
          <line x1="667" y1="32" x2="691" y2="17" stroke="#D92228" strokeWidth="4" strokeLinecap="round" />
          <polygon points="0,0 -22,-12 -22,12" transform="translate(710,6) rotate(-31)" fill="#D92228" />
        </g>

        {/* Dots and labeled circles */}
        {dots.map((d, i) => (
          <g key={i}
            style={{ ...fi(d.delay), cursor: d.tooltip ? 'default' : undefined }}
            onMouseEnter={() => d.tooltip && setHoveredDot(i)}
            onMouseLeave={() => setHoveredDot(null)}
          >
            {d.filled ? (
              <circle cx={d.x} cy={d.y} r={d.r} fill={d.color} />
            ) : (
              <>
                <circle cx={d.x} cy={d.y} r={d.r} fill={d.color} />
                <text
                  x={d.x} y={d.y}
                  textAnchor="middle" dominantBaseline="central"
                  fontSize="16" fontWeight="600"
                  fill={d.textFill} fontFamily={F}
                >{d.label}</text>
              </>
            )}
          </g>
        ))}

        {/* 67% annotation   vertical arrow, text centered above Design dot at x=230 */}
        <g style={fi(0.55)}>
          <text x="230" y="85" textAnchor="middle" fontSize="14" fontWeight="400" fill={TC} fontFamily={F}>
            67% of accessibility
          </text>
          <text x="230" y="103" textAnchor="middle" fontSize="14" fontWeight="400" fill={TC} fontFamily={F}>
            defects originate in design
          </text>
          <line x1="230" y1="109" x2="230" y2="234" stroke={TC} strokeWidth="1" />
          <polygon points="0,0 -9,-4 -9,4" transform="translate(230,243) rotate(90)" fill={TC} />
        </g>

        {/* Stage labels   body200 medium secondary */}
        {xLabels.map((l, i) => (
          <text
            key={i}
            x={l.x} y="334"
            textAnchor="middle"
            fontSize="12" fontWeight="500"
            fill={TS} fontFamily={F}
            style={fi(0.1 + i * 0.1)}
          >{l.text}</text>
        ))}

        {/* Tooltip   absolute last element so it always paints above everything */}
        {hoveredDot !== null && dots[hoveredDot]?.tooltip && (() => {
          const d = dots[hoveredDot];
          const TW = 210;
          const TH = 80;
          const tx = Math.min(Math.max(d.x - TW / 2, 10), 720 - TW - 10);
          const ty = d.y - d.r - TH - 14;
          return (
            <g style={{ pointerEvents: 'none' }}>
              <rect x={tx} y={ty} width={TW} height={TH} rx="8" ry="8" fill="#1A1816" />
              <polygon
                points={`${tx + TW / 2 - 7},${ty + TH} ${tx + TW / 2 + 7},${ty + TH} ${tx + TW / 2},${ty + TH + 9}`}
                fill="#1A1816"
              />
              <foreignObject x={tx + 12} y={ty + 12} width={TW - 24} height={TH - 24}>
                <div xmlns="http://www.w3.org/1999/xhtml"
                  style={{ fontSize: 12, lineHeight: 1.55, color: '#fff', fontFamily: F }}>
                  {d.tooltip}
                </div>
              </foreignObject>
            </g>
          );
        })()}
      </svg>
    </div>
  );
}

// ── WCAG inline examples ───────────────────────────────────────────────────
const ExWrap = styled.div`
  margin-top: 12px;
  font-family: ${FONT};
`;
const ExRow = styled.div`
  display: flex;
  gap: 10px;
`;
const ExPane = styled.div`
  flex: 1;
  border-radius: 10px;
  padding: 12px;
  border: 1.5px solid ${p => p.$good ? '#2D8653' : p.$bad ? '#C82021' : '#D3CFCA'};
  background: ${p => p.$good ? '#F0FAF4' : p.$bad ? '#FEF2F2' : '#F8F7F7'};
  font-size: 13px;
  line-height: 1.5;
  font-family: ${FONT};
`;
const ExPaneLabel = styled.div`
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: ${p => p.$good ? '#2D8653' : '#C82021'};
`;
const ExMockInput = styled.div`
  border: 1px solid #D3CFCA;
  border-radius: 6px;
  padding: 6px 10px;
  font-size: 12px;
  background: #fff;
  color: #1A1816;
  margin: 3px 0;
  font-family: ${FONT};
`;
const ExMockLabel = styled.div`
  font-size: 11px;
  font-weight: 600;
  color: #1A1816;
  margin-bottom: 2px;
  font-family: ${FONT};
`;
const ExMockBtn = styled.div`
  display: inline-flex;
  align-items: center;
  padding: 5px 12px;
  border-radius: 6px;
  background: ${p => p.$outline ? 'transparent' : '#1A1816'};
  color: ${p => p.$outline ? '#1A1816' : '#fff'};
  border: 1.5px solid #1A1816;
  font-size: 11px;
  font-weight: 600;
  font-family: ${FONT};
  margin-top: 4px;
`;
const ExCaption = styled.div`
  font-size: 11px;
  color: ${rdcUiTheme.color.text.secondary};
  margin-top: 6px;
  font-family: ${FONT};
`;

function WcagExample({ id }) {
  switch (id) {
    case 'alt-text':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ background: '#D3CFCA', borderRadius: 6, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 6 }}>🏠</div>
              <code style={{ fontSize: 11, color: '#C82021' }}>{`<img src="house.png">`}</code>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ background: '#D3CFCA', borderRadius: 6, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, marginBottom: 6 }}>🏠</div>
              <code style={{ fontSize: 11, color: '#2D8653' }}>{`alt="Front exterior of a 3-bed listing"`}</code>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'captions':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ background: '#D3CFCA', borderRadius: 6, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, position: 'relative' }}>
                ▶
              </div>
              <ExCaption>No captions available</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ background: '#D3CFCA', borderRadius: 6, height: 64, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', fontSize: 22 }}>▶</div>
                <div style={{ background: '#1A1816', color: '#fff', fontSize: 10, padding: '4px 8px' }}>Speaker: [caption text here]</div>
              </div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'info-relationships':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <ExMockLabel style={{ color: '#C82021' }}>Email</ExMockLabel>
              <ExMockInput>user@example.com</ExMockInput>
              <ExCaption>Color alone signals required</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <ExMockLabel style={{ color: '#C82021' }}>Email <span>*</span></ExMockLabel>
              <ExMockInput>user@example.com</ExMockInput>
              <div style={{ fontSize: 10, color: '#2D8653', marginTop: 3 }}>* Required field</div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'meaningful-sequence':
      return (
        <ExWrap>
          <ExPane>
            <ExPaneLabel style={{ color: '#1A1816' }}>Reading order</ExPaneLabel>
            {['① Header', '② Navigation', '③ Main content', '④ Footer'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '4px 0', fontSize: 12, borderBottom: i < 3 ? '1px solid #D3CFCA' : 'none' }}>
                <span style={{ color: '#0D2C62', fontWeight: 600 }}>{item}</span>
                {i < 3 && <span style={{ marginLeft: 'auto', color: '#726A60', fontSize: 10 }}>↓</span>}
              </div>
            ))}
          </ExPane>
        </ExWrap>
      );
    case 'sensory-characteristics':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ fontSize: 12 }}>Click the <span style={{ color: '#2D8653', fontWeight: 700 }}>green button</span> to continue</div>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ fontSize: 12 }}>Click the <strong>Submit button</strong> to continue</div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'orientation':
      return (
        <ExWrap>
          <ExPane>
            <ExPaneLabel style={{ color: '#1A1816' }}>Both orientations supported</ExPaneLabel>
            <div style={{ display: 'flex', gap: 20, justifyContent: 'center', marginTop: 4 }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 28, height: 48, border: '2px solid #1A1816', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</div>
                <span style={{ fontSize: 10, color: '#726A60' }}>Portrait</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <div style={{ width: 48, height: 28, border: '2px solid #1A1816', borderRadius: 5, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14 }}>✓</div>
                <span style={{ fontSize: 10, color: '#726A60' }}>Landscape</span>
              </div>
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'input-purpose':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <ExMockInput style={{ color: '#999' }}>Enter email</ExMockInput>
              <ExCaption>Placeholder only, no label</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <ExMockLabel>Email address</ExMockLabel>
              <ExMockInput>user@example.com</ExMockInput>
              <div style={{ fontSize: 10, color: '#2D8653', marginTop: 3 }}>✦ Autofill enabled</div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'use-of-color':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <ExMockLabel>Password <span style={{ color: '#C82021' }}>*</span></ExMockLabel>
              <ExMockInput>••••••</ExMockInput>
              <ExCaption>Color alone marks required</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <ExMockLabel>Password <span style={{ color: '#C82021' }}>*</span> <span style={{ color: '#555', fontWeight: 400 }}>(Required)</span></ExMockLabel>
              <ExMockInput>••••••</ExMockInput>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'contrast-small':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ background: '#fff', padding: 8, borderRadius: 6, fontSize: 13, color: '#999' }}>Sample text Aa</div>
              <ExCaption>#999 on white   2.1:1 ✗</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ background: '#fff', padding: 8, borderRadius: 6, fontSize: 13, color: '#1A1816' }}>Sample text Aa</div>
              <ExCaption>#1A1816 on white   7.2:1 ✓</ExCaption>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'contrast-large':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ background: '#fff', padding: 8, borderRadius: 6, fontSize: 18, color: '#BBB' }}>Large text Aa</div>
              <ExCaption>#BBB on white   1.6:1 ✗</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ background: '#fff', padding: 8, borderRadius: 6, fontSize: 18, color: '#555' }}>Large text Aa</div>
              <ExCaption>#555 on white   4.8:1 ✓</ExCaption>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'resize-text':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ overflow: 'hidden', background: '#fff', border: '1px solid #D3CFCA', borderRadius: 6, padding: 6, height: 44 }}>
                <span style={{ fontSize: 10, whiteSpace: 'nowrap', color: '#1A1816' }}>Fixed 10px text that overflows the box when scaled…</span>
              </div>
              <ExCaption>Fixed size   overflows at 200%</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 6, padding: 6 }}>
                <span style={{ fontSize: 13, color: '#1A1816', lineHeight: 1.5 }}>Scalable text at 200%   still fits the layout</span>
              </div>
              <ExCaption>Fluid size   adapts gracefully</ExCaption>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'reflow':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ display: 'flex', gap: 4, overflow: 'hidden' }}>
                <div style={{ minWidth: 80, background: '#D3CFCA', borderRadius: 4, padding: '6px 4px', fontSize: 10, textAlign: 'center' }}>Column A</div>
                <div style={{ minWidth: 80, background: '#D3CFCA', borderRadius: 4, padding: '6px 4px', fontSize: 10, textAlign: 'center' }}>Column B</div>
              </div>
              <ExCaption>Two columns   requires horizontal scroll</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ background: '#D3CFCA', borderRadius: 4, padding: '6px 4px', fontSize: 10, textAlign: 'center' }}>Column A</div>
                <div style={{ background: '#D3CFCA', borderRadius: 4, padding: '6px 4px', fontSize: 10, textAlign: 'center' }}>Column B</div>
              </div>
              <ExCaption>Single column   fits at 400%</ExCaption>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'non-text-contrast':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ background: '#fff', padding: 8, borderRadius: 6 }}>
                <div style={{ border: '1.5px solid #E0DEDA', borderRadius: 6, padding: '6px 12px', fontSize: 12, color: '#1A1816', display: 'inline-block' }}>Button</div>
              </div>
              <ExCaption>Border barely visible   fails 3:1</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ background: '#fff', padding: 8, borderRadius: 6 }}>
                <div style={{ border: '1.5px solid #1A1816', borderRadius: 6, padding: '6px 12px', fontSize: 12, color: '#1A1816', display: 'inline-block' }}>Button</div>
              </div>
              <ExCaption>Clear border   passes 3:1</ExCaption>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'text-spacing':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ fontSize: 12, lineHeight: 1.1, letterSpacing: '-0.5px', color: '#1A1816' }}>Cramped text with minimal line height and tight letter spacing makes reading very hard.</div>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ fontSize: 12, lineHeight: 1.8, letterSpacing: '0.3px', color: '#1A1816' }}>Generous line height and letter spacing keeps text comfortable to read.</div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'hover-focus':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   dismissable tooltip</ExPaneLabel>
            <div style={{ position: 'relative', background: '#1A1816', color: '#fff', borderRadius: 8, padding: '10px 12px', fontSize: 12, marginTop: 4 }}>
              <div>More info: this field accepts phone numbers in E.164 format.</div>
              <div style={{ position: 'absolute', top: 6, right: 8, fontSize: 14, cursor: 'pointer', color: '#ccc' }}>✕</div>
            </div>
            <ExCaption>Content is hoverable, dismissable, and persistent</ExCaption>
          </ExPane>
        </ExWrap>
      );
    case 'keyboard-trap':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ border: '1px solid #D3CFCA', borderRadius: 8, padding: 10, background: '#fff', fontSize: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 6 }}>Modal dialog</div>
                <div style={{ color: '#999' }}>No way to close this modal…</div>
              </div>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ border: '1px solid #D3CFCA', borderRadius: 8, padding: 10, background: '#fff', fontSize: 12, position: 'relative' }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Modal dialog</div>
                <ExMockBtn style={{ fontSize: 11 }}>✕ Close</ExMockBtn>
                <div style={{ color: '#726A60', fontSize: 10, marginTop: 4 }}>Press Esc to close</div>
              </div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'key-shortcuts':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   user controls shortcuts</ExPaneLabel>
            <div style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 8, padding: 10, fontSize: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>Keyboard shortcuts</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span>Save: <code style={{ background: '#F0F0F0', padding: '1px 5px', borderRadius: 4 }}>Ctrl+S</code></span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <ExMockBtn $outline style={{ fontSize: 10, marginTop: 0 }}>Disable</ExMockBtn>
                  <ExMockBtn $outline style={{ fontSize: 10, marginTop: 0 }}>Change</ExMockBtn>
                </div>
              </div>
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'timing':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   show time and allow extension</ExPaneLabel>
            <div style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 8, padding: 10, fontSize: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Session timeout</div>
              <div style={{ background: '#E9EFFB', borderRadius: 4, height: 8, marginBottom: 6 }}>
                <div style={{ background: '#0D2C62', borderRadius: 4, height: 8, width: '50%' }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#726A60' }}>2:30 remaining</span>
                <ExMockBtn style={{ fontSize: 10, marginTop: 0 }}>+ Extend time</ExMockBtn>
              </div>
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'pause-stop':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 8, padding: 10, fontSize: 12 }}>
                <div style={{ fontWeight: 600, marginBottom: 4 }}>Live feed</div>
                <div style={{ color: '#999', fontSize: 11 }}>Auto-updating… no controls</div>
              </div>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 8, padding: 10, fontSize: 12 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontWeight: 600 }}>Live feed</span>
                  <ExMockBtn $outline style={{ fontSize: 10, marginTop: 0 }}>⏸ Pause</ExMockBtn>
                </div>
                <div style={{ color: '#726A60', fontSize: 11 }}>Updating every 30s</div>
              </div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'three-flashes':
      return (
        <ExWrap>
          <ExPane>
            <ExPaneLabel style={{ color: '#1A1816' }}>Flash threshold guideline</ExPaneLabel>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', fontSize: 12 }}>
              <span style={{ fontSize: 20 }}>⚠️</span>
              <span>Max <strong>3 flashes/second</strong>   avoid rapid strobing effects that may trigger seizures</span>
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'bypass-blocks':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   skip link at top of page</ExPaneLabel>
            <div style={{ border: '1px solid #D3CFCA', borderRadius: 8, overflow: 'hidden', fontSize: 12 }}>
              <div style={{ background: '#0D2C62', color: '#fff', padding: '6px 12px', fontSize: 11, fontWeight: 600 }}>
                ⌨ Skip to main content
              </div>
              <div style={{ background: '#F8F7F7', padding: '8px 12px', color: '#726A60', fontSize: 11 }}>Nav · Nav · Nav · Nav…</div>
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'page-title':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <code style={{ fontSize: 11, color: '#C82021' }}>{`<title>Page</title>`}</code>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <code style={{ fontSize: 11, color: '#2D8653' }}>{`<title>Listings   realtor.com</title>`}</code>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'focus-order':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   numbered focus ring order</ExPaneLabel>
            {[['Name', '①'], ['Email', '②']].map(([label, num], i) => (
              <div key={i} style={{ marginBottom: 6 }}>
                <ExMockLabel>{label}</ExMockLabel>
                <div style={{ position: 'relative' }}>
                  <ExMockInput style={{ outline: '2px solid #0D2C62', outlineOffset: 1 }}>{label === 'Name' ? 'Jane Doe' : 'jane@example.com'}</ExMockInput>
                  <span style={{ position: 'absolute', top: -8, right: 6, background: '#0D2C62', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>{num}</span>
                </div>
              </div>
            ))}
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <ExMockBtn>Submit</ExMockBtn>
              <span style={{ position: 'absolute', top: -8, right: -8, background: '#0D2C62', color: '#fff', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700 }}>③</span>
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'link-purpose':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a href="#" style={{ color: '#0D2C62' }}>Read more →</a>
                <a href="#" style={{ color: '#0D2C62' }}>Read more →</a>
              </div>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a href="#" style={{ color: '#0D2C62' }}>Read the full accessibility guide →</a>
                <a href="#" style={{ color: '#0D2C62' }}>View the contrast checker →</a>
              </div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'multiple-ways':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   multiple navigation paths</ExPaneLabel>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 4 }}>
              {[['🔍', 'Search bar'], ['☰', 'Navigation menu'], ['🗺', 'Sitemap link']].map(([icon, label], i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', background: '#fff', border: '1px solid #D3CFCA', borderRadius: 6, padding: '5px 10px', fontSize: 12 }}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'headings-labels':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   logical heading hierarchy</ExPaneLabel>
            <div style={{ fontSize: 12, display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
              <div style={{ fontWeight: 700, fontSize: 14 }}>H1: Page Title</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginLeft: 12 }}>H2: Section</div>
              <div style={{ fontWeight: 500, fontSize: 12, marginLeft: 24, color: '#555' }}>H3: Sub-section</div>
              <div style={{ fontWeight: 500, fontSize: 12, marginLeft: 24, color: '#555' }}>H3: Sub-section</div>
              <div style={{ fontWeight: 600, fontSize: 13, marginLeft: 12 }}>H2: Section</div>
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'pointer-gestures':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ fontSize: 12, textAlign: 'center', padding: '8px 0' }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>🤏</div>
                <div>Pinch to zoom only</div>
              </div>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ fontSize: 12, textAlign: 'center', padding: '4px 0' }}>
                <div style={{ fontSize: 20, marginBottom: 4 }}>🤏</div>
                <div>Pinch to zoom</div>
                <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginTop: 6 }}>
                  <ExMockBtn $outline style={{ fontSize: 14, marginTop: 0, padding: '2px 10px' }}>−</ExMockBtn>
                  <ExMockBtn $outline style={{ fontSize: 14, marginTop: 0, padding: '2px 10px' }}>+</ExMockBtn>
                </div>
              </div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'label-in-name':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <ExMockBtn style={{ marginTop: 0 }}>Buy</ExMockBtn>
              <ExCaption>aria-label="submit order form"   mismatched</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <ExMockBtn style={{ marginTop: 0 }}>Buy now</ExMockBtn>
              <ExCaption>aria-label="Buy now   confirm purchase" ✓</ExCaption>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'dragging':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ fontSize: 12 }}>
                {['Item A', 'Item B', 'Item C'].map((item, i) => (
                  <div key={i} style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 5, padding: '4px 10px', marginBottom: 4, cursor: 'grab', fontSize: 11 }}>⠿ {item}</div>
                ))}
              </div>
              <ExCaption>Drag only   no alternative</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ fontSize: 12 }}>
                {['Item A', 'Item B', 'Item C'].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', border: '1px solid #D3CFCA', borderRadius: 5, padding: '4px 10px', marginBottom: 4, fontSize: 11 }}>
                    <span>⠿ {item}</span>
                    <div style={{ display: 'flex', gap: 2 }}>
                      <span style={{ cursor: 'pointer', color: '#555' }}>▲</span>
                      <span style={{ cursor: 'pointer', color: '#555' }}>▼</span>
                    </div>
                  </div>
                ))}
              </div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'target-size':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
                <div style={{ width: 20, height: 20, background: '#D3CFCA', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11 }}>✕</div>
              </div>
              <ExCaption>20×20px   too small</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2px 0' }}>
                <div style={{ width: 48, height: 48, background: '#D3CFCA', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>✕</div>
              </div>
              <ExCaption>48×48px   meets minimum</ExCaption>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'language':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   language picker upfront</ExPaneLabel>
            <div style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 8, padding: 10, fontSize: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 8 }}>Select your language</div>
              {['🇺🇸 English', '🇪🇸 Español', '🇫🇷 Français'].map((lang, i) => (
                <div key={i} style={{ padding: '4px 8px', borderRadius: 5, background: i === 0 ? '#E9EFFB' : 'transparent', cursor: 'pointer', marginBottom: 2 }}>{lang}</div>
              ))}
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'reading-level':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ fontSize: 11, lineHeight: 1.5, color: '#555' }}>Notwithstanding any provisions to the contrary contained herein, the lessee shall indemnify and hold harmless the lessor from any and all liabilities…</div>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ fontSize: 11, lineHeight: 1.5 }}>You are responsible for any damage you cause. The landlord won&apos;t be held liable for accidents during your stay.</div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'on-focus-input':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <ExMockLabel>Region</ExMockLabel>
              <ExMockInput>California ▼</ExMockInput>
              <ExCaption>Selecting auto-navigates   no confirmation</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <ExMockLabel>Region</ExMockLabel>
              <ExMockInput>California ▼</ExMockInput>
              <ExMockBtn style={{ marginTop: 6 }}>Go</ExMockBtn>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'consistent-nav':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   same nav order on every page</ExPaneLabel>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {['Page 1', 'Page 2'].map((page, pi) => (
                <div key={pi} style={{ flex: 1, border: '1px solid #D3CFCA', borderRadius: 6, overflow: 'hidden', fontSize: 10 }}>
                  <div style={{ background: '#0D2C62', color: '#fff', padding: 4, textAlign: 'center', fontWeight: 600 }}>{page}</div>
                  {['Home', 'Search', 'Account'].map((item, i) => (
                    <div key={i} style={{ padding: '3px 6px', background: i === 0 ? '#E9EFFB' : 'transparent', borderBottom: '1px solid #EEE' }}>{item}</div>
                  ))}
                </div>
              ))}
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'consistent-id':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
                <div style={{ background: '#D3CFCA', borderRadius: 6, padding: 8, fontSize: 16 }}>🔍</div>
                <span style={{ fontSize: 11, color: '#999' }}>vs</span>
                <div style={{ background: '#D3CFCA', borderRadius: 6, padding: 8, fontSize: 16 }}>⌕</div>
              </div>
              <ExCaption>Two different search icons   inconsistent</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center', padding: '8px 0' }}>
                <div style={{ background: '#D3CFCA', borderRadius: 6, padding: 8, fontSize: 16 }}>🔍</div>
                <span style={{ fontSize: 11, color: '#2D8653' }}>= same</span>
                <div style={{ background: '#D3CFCA', borderRadius: 6, padding: 8, fontSize: 16 }}>🔍</div>
              </div>
              <ExCaption>Consistent icon both times ✓</ExCaption>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'consistent-help':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   help in same location every page</ExPaneLabel>
            <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
              {['Page 1', 'Page 2'].map((page, pi) => (
                <div key={pi} style={{ flex: 1, border: '1px solid #D3CFCA', borderRadius: 6, overflow: 'hidden', fontSize: 10 }}>
                  <div style={{ background: '#F8F7F7', padding: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #D3CFCA' }}>
                    <span style={{ fontWeight: 600, color: '#1A1816' }}>{page}</span>
                    <span style={{ background: '#E9EFFB', color: '#0D2C62', borderRadius: '50%', width: 18, height: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>?</span>
                  </div>
                  <div style={{ padding: 8, color: '#726A60' }}>Content…</div>
                </div>
              ))}
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'error-id':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <ExMockLabel>Email</ExMockLabel>
              <ExMockInput style={{ borderColor: '#C82021' }}>not-an-email</ExMockInput>
              <ExCaption>Red border only   no error text</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <ExMockLabel>Email</ExMockLabel>
              <ExMockInput style={{ borderColor: '#C82021' }}>not-an-email</ExMockInput>
              <div style={{ fontSize: 11, color: '#C82021', marginTop: 3 }}>✗ Email is invalid. Use format: name@domain.com</div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'labels-instructions':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <ExMockInput style={{ color: '#999' }}>Email</ExMockInput>
              <ExCaption>Placeholder only   disappears on input</ExCaption>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <ExMockLabel>Email address</ExMockLabel>
              <ExMockInput>user@example.com</ExMockInput>
              <div style={{ fontSize: 10, color: '#726A60', marginTop: 3 }}>We&apos;ll send confirmation here</div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'error-prevention':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   confirm before finalizing</ExPaneLabel>
            <div style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 8, padding: 12, fontSize: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 6 }}>Confirm purchase</div>
              <div style={{ color: '#555', marginBottom: 10 }}>You are about to purchase for <strong>$299</strong>. Are you sure?</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <ExMockBtn $outline style={{ marginTop: 0 }}>Cancel</ExMockBtn>
                <ExMockBtn style={{ marginTop: 0 }}>Confirm</ExMockBtn>
              </div>
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'redundant-entry':
      return (
        <ExWrap>
          <ExRow>
            <ExPane $bad>
              <ExPaneLabel>Don&apos;t</ExPaneLabel>
              <div style={{ fontSize: 11, color: '#726A60', marginBottom: 4 }}>Step 2 of 3</div>
              <ExMockLabel>Email address (again)</ExMockLabel>
              <ExMockInput style={{ color: '#999' }}>Re-enter email…</ExMockInput>
            </ExPane>
            <ExPane $good>
              <ExPaneLabel>Do</ExPaneLabel>
              <div style={{ fontSize: 11, color: '#726A60', marginBottom: 4 }}>Step 2 of 3</div>
              <ExMockLabel>Email address</ExMockLabel>
              <ExMockInput>user@example.com</ExMockInput>
              <div style={{ fontSize: 10, color: '#2D8653', marginTop: 3 }}>✦ Pre-filled from step 1</div>
            </ExPane>
          </ExRow>
        </ExWrap>
      );
    case 'auth':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   multiple auth options</ExPaneLabel>
            <div style={{ background: '#fff', border: '1px solid #D3CFCA', borderRadius: 8, padding: 10, fontSize: 12 }}>
              <div style={{ fontWeight: 600, marginBottom: 8, textAlign: 'center' }}>Sign in</div>
              {[['🔑', 'Passkey'], ['👤', 'Password'], ['📱', 'Face ID']].map(([icon, label], i) => (
                <div key={i} style={{ display: 'flex', gap: 8, alignItems: 'center', padding: '5px 8px', borderRadius: 5, border: '1px solid #D3CFCA', marginBottom: 4, cursor: 'pointer' }}>
                  <span>{icon}</span><span>{label}</span>
                </div>
              ))}
            </div>
          </ExPane>
        </ExWrap>
      );
    case 'name-role-value':
      return (
        <ExWrap>
          <ExPane $good>
            <ExPaneLabel>Do   expose name, role, and state</ExPaneLabel>
            <div style={{ position: 'relative', marginTop: 8 }}>
              <ExMockBtn style={{ marginTop: 0 }}>Submit form</ExMockBtn>
              <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 4, fontSize: 11 }}>
                <div><span style={{ fontWeight: 600, color: '#0D2C62' }}>Name:</span> Submit form</div>
                <div><span style={{ fontWeight: 600, color: '#0D2C62' }}>Role:</span> button</div>
                <div><span style={{ fontWeight: 600, color: '#0D2C62' }}>State:</span> enabled</div>
              </div>
            </div>
          </ExPane>
        </ExWrap>
      );
    default:
      return null;
  }
}

// ── Levels-rich animated section ──────────────────────────────────────────────

function LevelsRichSection({ levels }) {
  const rowRef = useRef(null);
  const [visitCount, setVisitCount] = useState(0);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisitCount(c => c + 1); } },
      { threshold: 1.0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <RichLevelsRow ref={rowRef}>
      {levels.map((l, i) => (
        <RichLevelWrapper key={i}>
          <RichLevelTooltip>Level {l.level}</RichLevelTooltip>
          <RichCardAnimator
            key={`${i}-${visitCount}`}
            $animate={visitCount > 0}
            $delay={i * 180}
          >
            <RichLevelCard $height={l.height}>
              <RichLevelTopGroup>
                <RichLevelIllustration src={l.image} alt="" aria-hidden="true" />
                <RichLevelLabel>{l.label}</RichLevelLabel>
              </RichLevelTopGroup>
              <RichLevelDesc>{l.desc}</RichLevelDesc>
            </RichLevelCard>
          </RichCardAnimator>
        </RichLevelWrapper>
      ))}
    </RichLevelsRow>
  );
}

// ── Guideline detail components ───────────────────────────────────────────────

function wcagTagUrl(tag) {
  const afterColon = tag.split(': ')[1] || tag;
  const slug = afterColon.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return `https://www.w3.org/TR/WCAG22/#${slug}`;
}

const CHART_LINE = "#12A5A0";
const CHART_X    = ["3/5-3/11","3/12-3/18","3/19-3/25","3/26-4/1"];
const CHART_DATA = [
  { label:"Seen in search", value:"1.42k", trend:"-25%", data:[1300,1650,1800,1450], yLabels:[0,500,1000,1500,2000], altText:`alt="Line chart showing weekly search appearances per similar home. 1,420 average last week, down 25% from the prior period"` },
  { label:"Views",          value:"5.7",               data:[5.0,7.2,5.7,5.7],     yLabels:[0,2,4,6,8],           altText:`alt="Line chart showing average weekly views per similar home. 5.7 views last week."` },
  { label:"Saves",          value:"1.8",               data:[1.1,0.8,1.8,1.8],     yLabels:[0,0.5,1.0,1.5,2.0],   altText:`alt="Line chart showing average weekly saves per similar home. 1.8 saves last week."` }
];

function MiniLineChart({ data, yLabels }) {
  const W=300, H=160, pL=44, pB=30, pT=10, pR=10;
  const cW=W-pL-pR, cH=H-pT-pB;
  const yMax=yLabels[yLabels.length-1];
  const pts=data.map((v,i)=>({ x:pL+(i/(data.length-1))*cW, y:pT+cH-(v/yMax)*cH }));
  const path=pts.map((p,i)=>`${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:"auto", display:"block" }}>
      {yLabels.map((v,i)=>{ const y=pT+cH-(v/yMax)*cH; return (
        <g key={i}>
          <line x1={pL} y1={y} x2={W-pR} y2={y} stroke={rdcUiTheme.color.border.accent} strokeWidth={1}/>
          <text x={pL-6} y={y+4} textAnchor="end" fontSize={14} fill={rdcUiTheme.color.text.secondary} fontFamily={FONT}>{v}</text>
        </g>
      );})}
      {CHART_X.map((lbl,i)=>(
        <text key={i} x={pL+(i/(CHART_X.length-1))*cW} y={H-6} textAnchor="middle" fontSize={13} fill={rdcUiTheme.color.text.secondary} fontFamily={FONT}>{lbl}</text>
      ))}
      <path d={path} fill="none" stroke={CHART_LINE} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"/>
      {pts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={4} fill={CHART_LINE}/>)}
    </svg>
  );
}

function ChartExample() {
  const [tab, setTab] = useState("charts");
  const narrow = useNarrow(750);
  return (
    <div style={{ background:rdcUiTheme.color.bg.primary, border:`1px solid ${rdcUiTheme.color.border.accent}`, borderRadius:8, padding:24, display:"flex", flexDirection:"column", gap:24, width:"100%", boxSizing:"border-box" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:16, flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:200 }}>
          <div style={{ fontFamily:FONT, fontSize:22, fontWeight:600, letterSpacing:"-0.24px", color:rdcUiTheme.color.text.primary, lineHeight:"28px", marginBottom:8 }}>Last week's average demand per similar home</div>
          <div style={{ fontFamily:FONT, fontSize:15, color:rdcUiTheme.color.text.primary, lineHeight:"24px" }}>Based on Realtor.com users searching for homes nearby with a listing price similar to your home's estimated value</div>
        </div>
        <ContentSwitchGroup size="small" style={{ alignSelf:"flex-start", flexShrink:0 }}>
          <ContentSwitch
            selected={tab === "charts"}
            onClick={() => setTab("charts")}
            iconBefore={tab === "charts" ? <IconBarChartFilled size={2} /> : <IconBarChart size={2} />}
          >Charts</ContentSwitch>
          <span style={{ position: "relative" }}>
            <ContentSwitch
              selected={tab === "table"}
              onClick={() => setTab("table")}
              iconBefore={<IconList size={2} />}
            >Table</ContentSwitch>
            {tab !== "table" && <PulseDot />}
          </span>
        </ContentSwitchGroup>
      </div>

      {tab === "charts" ? (
        <div style={{ display:"flex", flexDirection: narrow ? "column" : "row", gap:20 }}>
          {CHART_DATA.map((c,i)=>(
            <div key={i} style={{ flex:"1 1 0", minWidth:0, display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ background:rdcUiTheme.color.bg.primary, border:`1px solid ${rdcUiTheme.color.border.accent}`, borderRadius:8, padding:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                  <span style={{ fontFamily:FONT, fontSize:24, fontWeight:600, letterSpacing:"-0.24px", color:rdcUiTheme.color.text.primary, lineHeight:"28px" }}>{c.value}</span>
                  {c.trend && <Tag dataColor="redSubtle" style={{ fontFamily:FONT }}>{c.trend} ↓</Tag>}
                </div>
                <div style={{ fontFamily:FONT, fontSize:15, color:rdcUiTheme.color.text.primary, marginBottom:16 }}>{c.label}</div>
                <MiniLineChart data={c.data} yLabels={c.yLabels}/>
              </div>
              <InlineMessage styleType="success" showIcon style={{ fontFamily:FONT }}>{c.altText}</InlineMessage>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ background:rdcUiTheme.color.bg.primary, border:`1px solid ${rdcUiTheme.color.border.accent}`, borderRadius:8, padding:"0 24px" }}>
        <TableContainer>
          <Table withLines>
            <TableHeader>
              <TableRow>
                <TableCell as="th" style={{ fontFamily:FONT }}>Week</TableCell>
                {CHART_DATA.map((c,i)=>(
                  <TableCell as="th" key={i} style={{ fontFamily:FONT }}>{c.label}</TableCell>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {CHART_X.map((week,wi)=>(
                <TableRow key={wi}>
                  <TableCell style={{ fontFamily:FONT, color:rdcUiTheme.color.text.secondary, backgroundColor:rdcUiTheme.color.bg.primary }}>{week}</TableCell>
                  {CHART_DATA.map((c,ci)=>(
                    <TableCell key={ci} style={{ fontFamily:FONT, backgroundColor:rdcUiTheme.color.bg.primary }}>{c.data[wi].toLocaleString()}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </div>
      )}
    </div>
  );
}

function UploadDropzone() {
  return (
    <div style={{ background: rdcUiTheme.color.bg.primary, border: `2px dashed ${rdcUiTheme.color.border.accent}`, borderRadius: 8, padding: "32px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4, width: "100%", boxSizing: "border-box", pointerEvents: "none", userSelect: "none" }}>
      <IconUpload size={3} color={rdcUiTheme.color.text.primary} />
      <p style={{ fontFamily: FONT, fontSize: 16, color: rdcUiTheme.color.text.primary, margin: 0, textAlign: "center", lineHeight: "24px" }}>
        {"Drag and drop your file(s) here or "}
        <span style={{ fontWeight: 500, textDecoration: "underline" }}>browse files</span>
      </p>
    </div>
  );
}

function GreetingUploadExample() {
  const radioOptions = [
    { value: "featured",       label: "Reuse your featured video",                  selected: false },
    { value: "recorded-video", label: "Recorded video greeting (Up to 5 mins)",     selected: true  },
    { value: "recorded-audio", label: "Recorded audio greeting (Up to 1 mins)",     selected: false },
    { value: "youtube",        label: "Attach a YouTube video",                     selected: false },
  ];
  return (
    <div style={{ background: rdcUiTheme.color.bg.primary, border: `1px solid ${rdcUiTheme.color.border.accent}`, borderRadius: 12, padding: 40, display: "flex", flexDirection: "column", gap: 24, width: "100%", boxSizing: "border-box" }}>
      {/* Section header */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <IconProfile size={3} color={rdcUiTheme.color.text.primary} />
        <span style={{ fontFamily: FONT, fontSize: 20, fontWeight: 700, color: rdcUiTheme.color.text.primary, letterSpacing: "0.6px", lineHeight: "32px" }}>Greeting</span>
      </div>
      {/* Radio group — static, non-interactive */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8, pointerEvents: "none" }}>
        {radioOptions.map(opt => {
          return (
            <div key={opt.value} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 18, height: 18, borderRadius: "50%", border: `2px solid ${opt.selected ? rdcUiTheme.color.interactive.primary.default.initial : rdcUiTheme.color.border.base}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {opt.selected && <div style={{ width: 8, height: 8, borderRadius: "50%", background: rdcUiTheme.color.interactive.primary.default.initial }} />}
              </div>
              <span style={{ fontFamily: FONT, fontSize: 16, color: rdcUiTheme.color.text.primary, lineHeight: "24px" }}>{opt.label}</span>
            </div>
          );
        })}
      </div>
      {/* Cards container */}
      <div style={{ border: `1px solid ${rdcUiTheme.color.border.accent}`, borderRadius: 8, padding: 24, boxSizing: "border-box" }}>
        {/* Card 1 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 500, color: rdcUiTheme.color.text.primary, lineHeight: "28px" }}>Attach your recorded video greeting</span>
            <span style={{ fontFamily: FONT, fontSize: 14, color: rdcUiTheme.color.text.secondary, flexShrink: 0, marginLeft: 16 }}>required</span>
          </div>
          <UploadDropzone />
          <FormHelperText id="file-helper-1" helperText="Accepted file types: .MP4, .MOV. Max file size is 5MB." />
        </div>
        {/* Divider */}
        <div style={{ height: 1, background: rdcUiTheme.color.border.accent, margin: "40px 0" }} />
        {/* Card 2 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <span style={{ fontFamily: FONT, fontSize: 18, fontWeight: 500, color: rdcUiTheme.color.text.primary, lineHeight: "28px" }}>Upload caption and/or transcript file(s)</span>
            <span style={{ fontFamily: FONT, fontSize: 14, color: rdcUiTheme.color.text.secondary, flexShrink: 0, marginLeft: 16 }}>required</span>
          </div>
          <p style={{ fontFamily: FONT, fontSize: 14, color: rdcUiTheme.color.text.primary, margin: "0 0 8px", lineHeight: "20px" }}>
            A caption file (.SRT or .VTT) or written transcript is required for all video greetings. This ensures your content is accessible to all viewers.
          </p>
          <UploadDropzone />
          <FormHelperText id="file-helper-2" helperText="Accepted file types: .SRT, .VTT, .TXT, .PDF. Max file size is 5MB." />
        </div>
      </div>
    </div>
  );
}

function VideoCardExample() {
  return (
    <img
      src="/Images/Perceivable/You're providing the content.svg"
      alt=""
      aria-hidden="true"
      style={{ width: 800, maxWidth: "100%", height: "auto", display: "block", margin: "0 auto" }}
    />
  );
}

function GDCriterionBlock({ criterion, isReadOnly }) {
  const examples = criterion.examples || [];
  const narrow = useNarrow(750);

  const multiExample = examples.length > 1;

  return (
    <div style={{ marginBottom: 32 }}>
      <GDCriterionTitle>
        {criterion.noTitleLink ? (
          <>{criterion.title} ({criterion.level} level)</>
        ) : (
          <a href={criterion.titleUrl || wcagTagUrl(criterion.tags[0])} target="_blank" rel="noopener noreferrer" style={{ color: rdcUiTheme.color.text.primary, textDecoration: "underline" }}>
            {criterion.title} ({criterion.level} level)
          </a>
        )}
      </GDCriterionTitle>
      {criterion.tagLinks && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
          {criterion.tagLinks.map((tl, i) => (
            <a key={i} href={tl.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <Tag dataColor="blueSubtle" disableCasingRule style={{ fontFamily: FONT, cursor: "pointer", textDecoration: "underline" }}>{tl.label}</Tag>
            </a>
          ))}
        </div>
      )}
      <GDBody>{criterion.body}</GDBody>
      {criterion.examplesIntro && <GDExamplesIntro>{criterion.examplesIntro}</GDExamplesIntro>}

      {examples.length > 0 && (
        <div>
          {examples.map((ex, ei) => (
            <div key={ei}>
              {ei > 0 && <GDDivider style={{ margin: '40px 0' }} />}
              {multiExample && <GDExTitle>{ex.title}</GDExTitle>}
              {multiExample && ex.desc && (
                <div>
                  <GDExDesc>{ex.desc}</GDExDesc>
                  {ex.descItems && (
                    <ul style={{ margin: "8px 0 12px", paddingLeft: 20 }}>
                      {ex.descItems.map((item, di) => (
                        <li key={di} style={{ fontSize: 18, color: rdcUiTheme.color.text.primary, fontFamily: FONT, lineHeight: 1.65, marginBottom: 4 }}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {ex.descFooter && (
                    <GDExDesc>
                      {ex.descFooter.startsWith("Pro Tip") ? (
                        <><span style={{ fontWeight: 600 }}>{ex.descFooter.split(":")[0]}:</span>{ex.descFooter.slice(ex.descFooter.indexOf(":") + 1)}</>
                      ) : ex.descFooter}
                    </GDExDesc>
                  )}
                </div>
              )}
              {ex.videoExample ? (
                <div style={{ width: "100%", background: rdcUiTheme.color.gray['50'], borderRadius: 16, padding: 24, boxSizing: "border-box" }}>
                  <VideoCardExample />
                </div>
              ) : ex.uploadExample ? (
                <div style={{ width: "100%", background: rdcUiTheme.color.gray['50'], border: `1px solid ${rdcUiTheme.color.border.accent}`, borderRadius: 16, padding: 24, boxSizing: "border-box" }}>
                  <GreetingUploadExample />
                </div>
              ) : ex.chartExample ? (
                <div style={{ width: "100%", background: rdcUiTheme.color.gray['50'], border: `1px solid ${rdcUiTheme.color.border.accent}`, borderRadius: 16, padding: 40, boxSizing: "border-box" }}>
                  <ChartExample />
                </div>
              ) : (
                <div style={{ width: "100%", background: rdcUiTheme.color.gray['50'], border: `1px solid ${rdcUiTheme.color.border.accent}`, borderRadius: 16, padding: 40, display: "flex", alignItems: narrow ? "center" : "flex-start", justifyContent: "center", flexDirection: narrow ? "column" : "row", gap: 33, boxSizing: "border-box" }}>
                  {ex.image && (ex.inlineSuccess || ex.inlineError) ? (
                    <>
                      <img src={ex.image} alt="" aria-hidden="true" style={{ width: "100%", maxWidth: 500, height: "auto", display: "block", borderRadius: 8, flex: "1 1 0", minWidth: 0 }} />
                      <div style={{ display: "flex", flexDirection: "column", gap: 16, flex: "1 1 0", minWidth: 0 }}>
                        {ex.inlineSuccess && (
                          <InlineMessage styleType="success" showIcon style={{ fontFamily: FONT }}>
                            {ex.inlineSuccess}
                          </InlineMessage>
                        )}
                        {ex.inlineError && (
                          <InlineMessage styleType="error" showIcon style={{ fontFamily: FONT }}>
                            <ul style={{ margin: "4px 0 0", paddingLeft: 18 }}>
                              {ex.inlineError.map((e, i) => <li key={i} style={{ fontFamily: FONT }}>{e}</li>)}
                            </ul>
                          </InlineMessage>
                        )}
                      </div>
                    </>
                  ) : ex.image && ex.imageInteraction ? (
                    <div style={{ display: "flex", flexDirection: narrow ? "column" : "row", alignItems: narrow ? "center" : "flex-end", width: "100%" }}>
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={ex.image} alt="" aria-hidden="true" style={{ width: "100%", maxWidth: 600, height: "auto", display: "block" }} />
                        <span style={{ marginTop: 8, fontFamily: FONT, fontSize: rdcUiTheme.typography.scale.body200.size, lineHeight: rdcUiTheme.typography.scale.body200.lineHeight, fontWeight: rdcUiTheme.typography.scale.body200.fontWeight, color: rdcUiTheme.color.text.secondary }}>Documentation</span>
                      </div>
                      <div style={{ width: narrow ? "100%" : 1, height: narrow ? 1 : "auto", alignSelf: "stretch", background: rdcUiTheme.color.border.accent, flexShrink: 0, margin: narrow ? "24px 0" : "0 48px" }} />
                      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img src={ex.imageInteraction} alt="" aria-hidden="true" style={{ width: "100%", maxWidth: 600, height: "auto", display: "block" }} />
                        <span style={{ marginTop: 8, fontFamily: FONT, fontSize: rdcUiTheme.typography.scale.body200.size, lineHeight: rdcUiTheme.typography.scale.body200.lineHeight, fontWeight: rdcUiTheme.typography.scale.body200.fontWeight, color: rdcUiTheme.color.text.secondary }}>Interaction</span>
                      </div>
                    </div>
                  ) : ex.image ? (
                    <img src={ex.image} alt="" aria-hidden="true" style={{ width: "100%", maxWidth: 600, height: "auto", display: "block" }} />
                  ) : (
                    <span style={{ fontFamily: FONT, fontSize: 16, color: rdcUiTheme.color.text.secondary }}>Placeholder</span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function GuidelineDetailSection({ s, isReadOnly }) {
  return (
    <div>
      <div style={{ background: rdcUiTheme.color.gray['50'], border: `1px solid ${rdcUiTheme.color.border.accent}`, borderRadius: 16, padding: 24, marginBottom: 32 }}>
        <GDSuccessLabel>WCAG Guideline</GDSuccessLabel>
        <GDHeading>
          {s.headingUrl
            ? <a href={s.headingUrl} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "underline", textUnderlineOffset: 3 }}>{s.heading}</a>
            : s.heading}
        </GDHeading>
        <GDIntro style={{ marginBottom: 0 }}>{s.intro}</GDIntro>
      </div>
      <GDSuccessLabel>Success criteria designers own</GDSuccessLabel>
      {s.criteria.map((criterion, ci) => (
        <div key={ci}>
          {ci > 0 && <GDDivider style={{ margin: '40px 0' }} />}
          <GDCriterionBlock criterion={criterion} isReadOnly={isReadOnly} />
        </div>
      ))}
    </div>
  );
}

// ── Section renderer ──────────────────────────────────────────────────────────

function Section({ section: s, acc, isReadOnly }) {
  const c = acc || CAT.teal;

  if (s.type === "page-title") return (
    <div style={{ marginBottom: 4 }}>
      <PageTitleH2>{s.heading}</PageTitleH2>
      {s.body && (
        <BodyStack>
          {s.body.map((p, i) => <Para key={i} para={p} />)}
        </BodyStack>
      )}
    </div>
  );

  if (s.type === "cost-chart") return <CostChart />;

  if (s.type === "pour-grid-rich") return (
    <PourRichStack>
      {s.items.map((item, i) => (
        <PourRichCard key={i}>
          <PourRichContent>
            <PourRichEyebrow>{item.word}</PourRichEyebrow>
            <PourRichTextGroup>
              <PourRichTitle>{item.title}</PourRichTitle>
              <PourRichBody>{item.body}</PourRichBody>
            </PourRichTextGroup>
          </PourRichContent>
          <PourRichImage src={item.image} alt="" aria-hidden="true" />
        </PourRichCard>
      ))}
    </PourRichStack>
  );

  if (s.type === "levels-rich") return <LevelsRichSection levels={s.levels} />;

  if (s.type === "page-body") return (
    <BodyStack>
      {s.paragraphs.map((p, i) => {
        if (typeof p === 'object' && p.bullet) {
          const colonIdx = p.text.indexOf(':');
          const prefix = colonIdx !== -1 ? p.text.slice(0, colonIdx + 1) : null;
          const rest   = colonIdx !== -1 ? p.text.slice(colonIdx + 1) : p.text;
          return (
            <BodyText key={i} as="li" style={{ marginLeft: '1.25em', listStyleType: 'disc' }}>
              {prefix && <strong style={{ fontWeight: 600 }}>{prefix}</strong>}{rest}
            </BodyText>
          );
        }
        return <BodyText key={i}>{typeof p === 'object' ? p.text : p}</BodyText>;
      })}
    </BodyStack>
  );

  if (s.type === "info-note") return (
    <InfoNote>🎯 {s.text}</InfoNote>
  );

  if (s.type === "pour-intro") return (
    <PourIntroWrap>
      <PourIntroH2>{s.heading}</PourIntroH2>
      <BodyText style={{ color: "#5C5C5C", lineHeight: 1.7 }}>{s.body}</BodyText>
    </PourIntroWrap>
  );

  if (s.type === "text") return (
    <div>
      <SH>{s.heading}</SH>
      {Array.isArray(s.body) ? (
        <BodyStack>
          {s.body.map((p, i) => <BodyText key={i} style={{ lineHeight: 1.7 }}>{p}</BodyText>)}
        </BodyStack>
      ) : (
        <BodyText style={{ lineHeight: 1.7 }}>{s.body}</BodyText>
      )}
    </div>
  );

  if (s.type === "stat-grid") return (
    <div>
      <SH>{s.heading}</SH>
      <StatGrid>
        {s.stats.map((st, i) => (
          <AnimatedStatCard key={i} stat={st} />
        ))}
      </StatGrid>
    </div>
  );

  if (s.type === "impact-note") return (
    <div>
      <SH>{s.heading}</SH>
      <BodyText>{s.body}</BodyText>
    </div>
  );

  if (s.type === "spectrum") return (
    <div>
      <SH>{s.heading}</SH>
      <SpectrumGrid>
        {s.items.map((item, i) => (
          <SpectrumCard key={i}>
            <img src={item.image} alt={item.category} style={{ width: '100%', maxWidth: 130, display: 'block' }} />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
              <SpectrumCardTitle>{item.category}</SpectrumCardTitle>
              <SpectrumCardText>{item.subtitle}</SpectrumCardText>
            </div>
          </SpectrumCard>
        ))}
      </SpectrumGrid>
    </div>
  );

  if (s.type === "guideline-cards") return (
    <div>
      <GuidelineCardsIntro>
        <GuidelineCardsHeadingLink href={s.href} target="_blank" rel="noopener noreferrer">
          {s.heading}
        </GuidelineCardsHeadingLink>
        {s.intro.map((p, i) => <GuidelineCardsBody key={i}>{p}</GuidelineCardsBody>)}
      </GuidelineCardsIntro>
      <GuidelineCardsGrid>
        {s.cards.map((card, i) => (
          <GuidelineCardWrap key={i}>
            <GuidelineCardLink>
              {card.image
                ? <GuidelineCardImg src={card.image} alt="" aria-hidden="true" />
                : <div style={{ width: "100%", maxWidth: 140, height: 100, background: rdcUiTheme.color.gray['50'], borderRadius: 8, border: `1px solid ${rdcUiTheme.color.border.accent}` }} />}
              <GuidelineCardTitle>{card.title}</GuidelineCardTitle>
              <GuidelineCardDesc>{card.desc}</GuidelineCardDesc>
            </GuidelineCardLink>
          </GuidelineCardWrap>
        ))}
      </GuidelineCardsGrid>
      {s.outro && <GuidelineCardsBody style={{ marginTop: 8 }}>{s.outro}</GuidelineCardsBody>}
    </div>
  );

  if (s.type === "curb-cut") {
    const paras = s.body.split("\n\n");
    return (
      <div>
        <BodyStack style={{ marginBottom: 20 }}>
          {paras.map((para, i) => {
            if (i === 0) {
              const dot = para.indexOf(".");
              return (
                <BodyText key={i}>
                  <strong>{para.slice(0, dot + 1)}</strong>{para.slice(dot + 1)}
                </BodyText>
              );
            }
            return <BodyText key={i}>{para}</BodyText>;
          })}
        </BodyStack>
        <BulletList>
          {s.items.map((item, i) => (
            <BulletItem key={i}>
              <BulletDot aria-hidden="true">•</BulletDot>
              <BulletText>{item}</BulletText>
            </BulletItem>
          ))}
        </BulletList>
      </div>
    );
  }

  if (s.type === "pour-grid") return (
    <div>
      <SH>{s.heading}</SH>
      <PourCompactStack>
        {s.items.map((item, i) => {
          const pc = [CAT.teal, CAT.blue, CAT.purple, CAT.orange][i] || c;
          return (
            <PourCompactItem key={i} $subtle={pc.subtle}>
              <PourCompactLetter $bold={pc.bold}>{item.letter}</PourCompactLetter>
              <div>
                <PourCompactWord $bold={pc.bold}>{item.word}</PourCompactWord>
                <PourCompactDesc>{item.desc}</PourCompactDesc>
                <PourCompactExample $bold={pc.bold}>e.g. {item.example}</PourCompactExample>
              </div>
            </PourCompactItem>
          );
        })}
      </PourCompactStack>
    </div>
  );

  if (s.type === "levels") return (
    <div>
      <SH>{s.heading}</SH>
      <LevelsRow>
        {s.levels.map((l, i) => (
          <LevelCard key={i} $color={l.color}>
            <LevelNum $color={l.color}>Level {l.level}</LevelNum>
            <LevelDesc>{l.desc}</LevelDesc>
          </LevelCard>
        ))}
      </LevelsRow>
      <InfoNote>🎯 {s.note}</InfoNote>
    </div>
  );

  if (s.type === "criteria-list-grouped") return <AccordionCriteria s={s} acc={c} />;

  if (s.type === "guideline-detail") return <GuidelineDetailSection s={s} isReadOnly={isReadOnly} />;

  if (s.type === "wcag-guidelines") return (
    <GuidelinesStack>
      {s.categories.map((cat, ci) => (
        <div key={ci}>
          <GuidelineCatName>{cat.name}</GuidelineCatName>
          <div>
            {cat.items.map((item, ii) => (
              <GuidelineItem key={ii}>
                <GuidelineItemHeader>
                  <GuidelineItemTitle>{item.title}</GuidelineItemTitle>
                  <GuidelineLevels>
                    {item.levels.map((l, li) => <LevelBadge key={li} level={l} />)}
                  </GuidelineLevels>
                </GuidelineItemHeader>
                <GuidelineTags>
                  {item.tags.map((tg, ti) => <WcagTag key={ti} label={tg} />)}
                </GuidelineTags>
                <GuidelineBody>{item.body}</GuidelineBody>
                {item.example && <WcagExample id={item.example} />}
              </GuidelineItem>
            ))}
          </div>
        </div>
      ))}
    </GuidelinesStack>
  );

  if (s.type === "plugin-cards") return (
    <div>
      <SH>{s.heading}</SH>
      <PluginGrid>
        {s.plugins.map((p, i) => (
          <PluginCard key={i}>
            <PluginIcon aria-hidden="true">{p.icon}</PluginIcon>
            <PluginName>{p.name}</PluginName>
            <PluginUse>{p.use}</PluginUse>
          </PluginCard>
        ))}
      </PluginGrid>
    </div>
  );

  if (s.type === "annotation-guide") return (
    <div>
      <SH>{s.heading}</SH>
      <BodyText style={{ color: "#5C5C5C", marginBottom: 14, lineHeight: 1.6 }}>{s.body}</BodyText>
      <AnnotationList>
        {s.items.map((item, i) => (
          <AnnotationItem key={i}>
            <AnnotationIcon aria-hidden="true">{item.icon}</AnnotationIcon>
            <div>
              <AnnotationLabel>{item.label}</AnnotationLabel>
              <AnnotationDesc>{item.desc}</AnnotationDesc>
            </div>
          </AnnotationItem>
        ))}
      </AnnotationList>
    </div>
  );

  if (s.type === "naming-guide") return (
    <div>
      <SH>{s.heading}</SH>
      <BodyText style={{ color: "#5C5C5C", marginBottom: 14, lineHeight: 1.6 }}>{s.body}</BodyText>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <NamingGrid style={{ marginBottom: 4 }}>
          <NamingHeader style={{ color: CAT.green.bold }}>Do</NamingHeader>
          <NamingHeader style={{ color: CAT.red.bold }}>Don&apos;t</NamingHeader>
        </NamingGrid>
        {s.rules.map((r, i) => (
          <NamingGrid key={i}>
            <NamingCell $bg={CAT.green.subtle} $border={CAT.green.bold} $color={CAT.green.bold}>{r.do}</NamingCell>
            <NamingCell $bg={CAT.red.subtle} $border={CAT.red.bold} $color={CAT.red.bold}>{r.dont}</NamingCell>
          </NamingGrid>
        ))}
      </div>
    </div>
  );

  if (s.type === "storybook-guide") return (
    <div>
      <SH>{s.heading}</SH>
      <BodyText style={{ color: "#5C5C5C", marginBottom: 16, lineHeight: 1.6 }}>{s.body}</BodyText>
      <StepGuideList>
        {s.steps.map((st, i) => (
          <StepGuideItem key={i}>
            <StepGuideNum>{st.num}</StepGuideNum>
            <div>
              <StepGuideTitle>{st.title}</StepGuideTitle>
              <StepGuideDesc>{st.desc}</StepGuideDesc>
            </div>
          </StepGuideItem>
        ))}
      </StepGuideList>
    </div>
  );

  if (s.type === "do-dont") return (
    <div>
      <SH>{s.heading}</SH>
      <div style={{ display:"flex", flexDirection:"column", gap:32 }}>
        {s.pairs.map((p, i) => (
          <div key={i}>
            <div style={{ width:"100%", background: rdcUiTheme.color.gray['50'], border:`1px solid ${rdcUiTheme.color.border.accent}`, borderRadius:16, padding:40, display:"flex", alignItems:"center", justifyContent:"center", boxSizing:"border-box" }}>
              {p.image
                ? <img src={p.image} alt="" aria-hidden="true" style={{ width:"100%", maxWidth:600, height:"auto", display:"block" }} />
                : <span style={{ fontFamily:FONT, fontSize:16, color:rdcUiTheme.color.text.secondary }}>Placeholder</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (s.type === "checklist-module") return <ChecklistModule s={s} />;

  if (s.type === "resources") return (
    <div>
      <SH>{s.heading}</SH>
      <ResourcesList>
        {s.links.map((l, i) => (
          <ResourceLink
            key={i}
            href={l.url}
            target="_blank"
            rel="noreferrer"
            aria-label={`${l.title} (opens in new tab)`}
          >
            <ResourceIcon aria-hidden="true">🔗</ResourceIcon>
            <div>
              <ResourceTitle>{l.title}</ResourceTitle>
              <ResourceDesc>{l.desc}</ResourceDesc>
            </div>
          </ResourceLink>
        ))}
      </ResourcesList>
    </div>
  );

  return null;
}

// ── Module data ───────────────────────────────────────────────────────────────

const MODULE_IMAGES = [
  "/module-1.svg", "/module-2.svg", "/module-3.svg",
  "/module-4.svg", "/module-5.svg", "/module-6.svg",
  "/module-7.svg", "/module-8.svg", "/module-9.svg"
];

const MODULES = [
  { id:0, title:"Why accessibility matters", headerTitle:"Designing for Accessibility: One Pixel at a Time", emoji:"💡",
    pages:[
      { sections:[
        { type:"page-title", heading:"Why accessibility in design matters", body:[
          { parts: ["Design is not decoration. Design is communication, and communication only works if everyone can receive it. When we create a digital product, we are making a powerful choice in every design decision: ", { text: "to include or to exclude.", italic: true, semibold: true }] },
          "When we lead and design with empathy, we stop seeing accessibility as a constraint and start seeing it as a creative challenge. One that, when solved well, makes everything better, for everyone."
        ]},
        { type:"stat-grid", heading:"The scale of disability", stats:[
          { value:"1 in 4", percent:25,  label:"U.S. adults live with\nsome form of disability", href:"https://www.cdc.gov/disability-and-health/articles-documents/disability-impacts-all-of-us-infographic.html" },
          { value:"8%",     percent:8,   label:"of men have color\nvision deficiency",             href:"https://pubmed.ncbi.nlm.nih.gov/22472762/" },
          { value:"7.5M",   percent:2.3, label:"Americans have\nvisual impairments",               href:"https://www.cdc.gov/vision-health-data/prevalence-estimates/vision-loss-prevalence.html" },
          { value:"15%",    percent:15,  label:"of the global population\nhas a disability",       href:"https://www.who.int/teams/noncommunicable-diseases/sensory-functions-disability-and-rehabilitation/world-report-on-disability" }
        ]},
        { type:"impact-note", heading:"The impact:", body:"Those numbers reflect that we are not designing for a niche audience or an edge case. It can be your coworker, your parent, your future self. Every one of those numbers represents a real person trying to use something you made, and whether or not they can is largely up to you." }
      ]},
      { sections:[
        { type:"page-title", heading:"Accessibility benefits everyone", body:[
          "Accessible design doesn't just help users with disabilities. It improves the experience for all users. When you design for people at the margins, you end up benefiting everyone."
        ]},
        { type:"curb-cut",
          body:"Subtitles are the perfect example. Originally developed as an accessibility feature for users who are Deaf or hard of hearing, captions are now used by an enormous share of the general population: people watching videos in noisy environments like airports or cafes, people learning in a second language, people who simply prefer to read along. A feature born from accessibility became a mainstream expectation.\n\nThe same principle plays out across design, again and again:",
          items:[
            "High contrast modes, designed for users with low vision, are beloved by anyone using a device in bright sunlight.",
            "Voice interfaces, built for users with motor impairments, became the foundation of smart speakers that millions use daily while cooking, driving, or multitasking.",
            "Keyboard navigation, essential for users who can't use a mouse, benefits power users who prefer not to reach for one.",
            "Readable typography and clear visual hierarchy, critical for users with cognitive or learning differences, makes content more digestible for everyone, including people who are simply tired or distracted.",
            "Autocomplete and predictive text, originally developed to help users with motor difficulties reduce keystrokes, is now a feature every smartphone user relies on."
          ]
        },
        { type:"spectrum", heading:"Disability is a spectrum", items:[
          { category:"Permanent",   subtitle:"One arm",        image:"/permanent.svg" },
          { category:"Situational", subtitle:"Holding a baby", image:"/situational.svg" },
          { category:"Temporary",   subtitle:"Broken arm",     image:"/temporary.svg" }
        ]}
      ]},
      { sections:[
        { type:"page-title", heading:"The designer's responsibility", body:[
          "As designers, we hold more power than we often acknowledge. Long before a single line of code is written, we decide the structure of an experience. We choose color palettes, define hierarchy, determine flow. We set the tone (literally and figuratively) for how a product feels to every person who uses it.",
          { parts:[ "A Deque study determined that ", { text:"67% of accessibility issues are introduced at the design stage", href:"https://www.deque.com/blog/is-closing-the-web-accessibility-design-development-gap-a-bridge-too-far/" }, ". Which means that by the time an engineer writes the first line of code, the damage is often already done, and that puts the responsibility and opportunity directly in our hands." ]}
        ]},
        { type:"cost-chart" },
        { type:"text", heading:"The longer you wait, the more it costs", body:[
          "See those numbers on the curve? They're cost multipliers. Fix an accessibility issue during design and it's relatively cheap. Let it survive to production and you're paying 37.5x more to fix the exact same problem.",
          "That 67% stat means most of those problems started in design in the first place, which puts us, designers, in a pretty unique position. We can be the reason things break, or the reason they never do."
        ]}
      ]}
    ],
    quiz:[
      { question:"Approximately what percentage of the global population has a disability?", options:["5%","10%","15%","25%"], answer:2, explanation:"The WHO estimates that 15% of the world's population (over 1 billion people) live with some form of disability." },
      { question:"A colleague breaks their arm and struggles to use a mouse for 6 weeks. According to the disability spectrum, how would this be classified?", options:["Situational","Developmental","Permanent","Temporary"], answer:3, explanation:"The disability spectrum includes permanent, temporary, and situational conditions. A broken arm is a temporary disability, a short-term condition that creates real barriers." },
      { question:"A Deque study found that 67% of accessibility issues are introduced at the design stage. What is the most significant implication for design teams?", options:["Designers should hand off accessibility responsibilities to developers early","Most accessibility barriers can be prevented before any code is written","Accessibility audits at launch are sufficient to catch most issues","Accessibility issues are too complex to address until the product is built"], answer:1, explanation:"Because 67% of issues originate in design decisions, the majority of barriers can be eliminated before development begins. The design stage is where the greatest opportunity to solve it lives." }
    ]
  },
  { id:1, title:"WCAG: The Global Standard for Accessibility", emoji:"📐",
    pages:[
      { sections:[
        { type:"page-title", heading:"Accessibility has a rulebook. It's called WCAG.", body:[
          "WCAG stands for Web Content Accessibility Guidelines. It is the internationally recognized standard for building digital experiences that work for everyone. Published by the W3C and referenced by governments, courts, and organizations worldwide, WCAG is the closest thing the web has to a universal definition of what 'accessible' actually means.",
          "WCAG 2.2 is the current version. And while it covers a lot of ground, everything inside it traces back to four foundational principles known as POUR."
        ]},
        { type:"pour-grid-rich", items:[
          { letter:"P", word:"Perceivable",    image:"/perceivable.svg",    title:"Information has to be receivable, not just visible.", body:"If a user can't see, hear, or otherwise sense the content you're presenting, it might as well not exist. Alt text for images, captions for video, sufficient color contrast. These elements ensure that nothing essential is invisible to any sense." },
          { letter:"O", word:"Operable",       image:"/operable.svg",       title:"Your interface has to work however a person interacts with it.", body:"Not everyone uses a mouse. Not everyone taps a screen. Keyboard navigation, focus states, no flashing content. Operability means your product responds to the full range of human input, not just the most common one." },
          { letter:"U", word:"Understandable", image:"/understandable.svg",  title:"Can someone actually make sense of what they're looking at?", body:"Clear error messages, consistent navigation, predictable interactions. Understandable design doesn't just present information, it communicates it. If a user has to guess what happens next, something has already gone wrong." },
          { letter:"R", word:"Robust",         image:"/robust.svg",          title:"Your product needs to work across technologies, not just today.", body:"Not just on your browser, on your device, but also across screen readers and assistive tools. Proper semantic HTML and ARIA labels ensure that as technology evolves, your product remains usable. Robustness is how accessibility stays accessible over time." }
        ]}
      ]},
      { sections:[
        { type:"page-title", heading:"Conformance levels", body:[
          "Not all accessibility criteria carry the same weight. WCAG organizes its guidelines into three tiers, each one building on the last, each one raising the bar for what an inclusive experience looks like.",
          "Think of them less as grades and more as a spectrum of commitment."
        ]},
        { type:"levels-rich", levels:[
          { level:"A",   image:"/level-a.svg",   label:"Minimum | Must meet",     desc:"Failing here blocks access entirely.",                           height:300 },
          { level:"AA",  image:"/level-aa.svg",  label:"Standard | Our target",   desc:"Required by ADA and Section 508, and most legal standards.",    height:360 },
          { level:"AAA", image:"/level-aaa.svg", label:"Enhanced | Gold standard", desc:"Not required, but significantly raises the bar for everyone.", height:420 }
        ]},
        { type:"page-body", paragraphs:[
          { text:"Level A: is non-negotiable. Failing it means your product is actively unusable for some people.", bullet:true },
          { text:"Level AA: is where the industry, the law, and your users expect you to be. It's the difference between a product that tolerates accessibility and one that genuinely practices it.", bullet:true },
          { text:"Level AAA: goes further. Addressing edge cases and nuanced needs that not every product can, or needs to, fully satisfy.", bullet:true },
          "Most teams aim for AA and call it done. That's the legal standard, and meeting it matters. But as you'll see throughout this course, the most thoughtful designers treat AA as the starting point, not the finish line."
        ]},
      ]}
    ],
    quiz:[
      { question:"Which statement most accurately describes the relationship between WCAG conformance levels?", options:["Each level is independent. Teams can choose to meet AA without meeting A","AAA is required for products serving users with permanent disabilities","Each level builds on the previous one. AA requires meeting all A and AA criteria","Level A and AA share the same criteria, AA simply requires more testing"], answer:2, explanation:"WCAG conformance levels are cumulative, not separate. To claim AA compliance, a product must satisfy every Level A criterion and every Level AA criterion. Skipping Level A while meeting AA is not possible   the levels stack. This is why Level A failures are so critical: they sit at the foundation of everything above them." },
      { question:"A navigation menu works perfectly with a mouse but cannot be accessed using a keyboard alone. Which POUR principle does this violate?", options:["Perceivable: the menu is not visible to all users","Understandable: the menu behavior is unpredictable","Robust: the menu won't work across assistive technologies","Operable: all UI components must work across the full range of human input"], answer:3, explanation:"Operable means your interface responds to every way a person might interact with it, not just the most common one. A menu that only works with a mouse excludes keyboard-only users, including people using assistive technology, motor-impaired users, and power users who prefer not to reach for a mouse. If it can't be navigated without a mouse, it fails Operable." },
      { question:"A website works on Chrome and Safari today but breaks completely when accessed through a screen reader. Which POUR principle does this most directly violate?", options:["Robust: content must work reliably across technologies and assistive tools","Understandable: the content is confusing when read aloud","Operable: the interface cannot be navigated without a mouse","Perceivable: the content cannot be sensed by the user"], answer:0, explanation:"Robust means your product isn't just built for today's most common browsers and devices. It must hold up across the full range of technologies people use to access the web, including screen readers and other assistive tools. A product that works visually but breaks for screen reader users hasn't been built to last. Robustness is how accessibility stays accessible over time." }
    ]
  },
  { id:2, title:"WCAG principles | Perceivable", emoji:"👁️",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"Perceivable Guidelines",
          href:"https://www.w3.org/TR/WCAG22/#perceivable",
          intro:[
            "This principle focuses on making web content perceivable to all users, regardless of their sensory abilities. This principle ensures that information and user interface components are presented in ways that can be perceived by everyone. There are 4 guidelines to follow and in the next pages, we will explain how you can design with these guidelines in mind:"
          ],
          cards:[
            { title:"Text alternatives",  image:"/text-alternatives.svg",  desc:"Making non-text content accessible. Not everyone can access visual information the same way.",                                              href:"https://www.w3.org/TR/WCAG22/#text-alternatives",  tooltip:"WCAG 1.1   Text alternatives" },
            { title:"Time-based media",   image:"/time-based-media.svg",   desc:"Making audio and video content accessible, especially for users who can't see or hear it.",                                               href:"https://www.w3.org/TR/WCAG22/#time-based-media",   tooltip:"WCAG 1.2   Time-based media" },
            { title:"Adaptable",          image:"/adaptable.svg",          desc:"Creating content that can be presented in different ways without losing meaning.",                                                         href:"https://www.w3.org/TR/WCAG22/#adaptable",          tooltip:"WCAG 1.3   Adaptable" },
            { title:"Distinguishable",    image:"/distinguishable.svg",    desc:"Ensuring that web content information is not conveyed through color alone, and all content is visible for all.", href:"https://www.w3.org/TR/WCAG22/#distinguishable",    tooltip:"WCAG 1.4   Distinguishable" }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"1.1 Text alternatives",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/text-alternatives.html",
          intro:"All non-text content must have a text alternative. This crucial guideline ensures that users who cannot see or interpret visual elements can still understand them, as the text alternatives convey the same purpose or information as the visual content. Decorative elements do not require a text alternative. A decorative element is one that adds visual polish but carries no informational value, you should annotate in your designs when a visual element is purely decorative.",
          criteria:[
            { title:"1.1.1 Non-text content", level:"A", tags:["1.1.1: Non-text Content"],
              titleUrl:"https://www.w3.org/WAI/WCAG22/Understanding/non-text-content.html",
              body:"Every piece of non-text content in your designs needs a text alternative unless it's decorative. That distinction matters, because getting it wrong in either direction creates problems: missing alternative text leaves screen reader users without information, while adding alternative text to decorative content creates noise that makes navigation harder.",
              examplesIntro:"Here are examples of the non-text content that requires a text alternative:",
              examples:[
                { title:"Icon buttons", image:"/Images/Perceivable/icon-button.svg", imageInteraction:"/Images/Perceivable/icon-button-interaction.svg", desc:"An icon button that lacks a visible label must have an accessible name that clearly describes its intended action, not merely its visual appearance. Without an accessible name:", descItems:["Screen reader users will not understand the button's purpose.","Other users who may not recognize the icon's meaning will also be unclear about the button's function."], descFooter:"Pro Tip: Display the accessible name in a tooltip that appears upon hover or focus.", dont:{ caption:"Don't use an icon button without an accessible name   screen readers will announce it by its file name or skip it entirely." }, do:{ caption:"Do add an aria-label that describes the button's action, such as 'Close dialog' or 'Share to Twitter'." } },
                { title:"Meaningful images", image:"/Images/Perceivable/alt-image.png", desc:"For images that convey essential information or context, a concise, descriptive alternative text (alt text) is required. This alt text should be under 125 characters and clearly communicate the image's purpose and context. The alt text serves two primary functions: it is read aloud to screen reader users, and it is displayed as a text substitute when the image fails to load.", descFooter:"If alt text is omitted, the image will be named by its filename, which is unhelpful to the user because it lacks context.", inlineSuccess:`alt="Open kitchen with white cabinets, quartz countertops, stainless steel appliances, and dark hardwood floors, opening to a dining area and living room."`, inlineError:[`alt="Kitchen image"`,`alt="IMG_387"`], dont:{ caption:"Don't leave alt text blank or use 'image.png' for images that communicate content or context." }, do:{ caption:"Do write alt text that conveys the meaning of the image to someone who cannot see it." } },
                { title:"Charts", chartExample:true, desc:"Charts use visuals to convey complex information to users. But since they are another form of images, these provide serious accessibility issues to colorblind users and users of screen readers. Here is how you can make your charts accessible:", descItems:["Provide a brief description of what the chart is about along with the title","Provide alternative text for basic visualisations","For complex charts, provide a text summary in addition to the alternative text","Provide a properly coded data table near the chart","Provide the source link of the information, if there is one"], descFooter:"This serves multiple audiences because the text can explain the summary of the chart, the table can provide exact data for those who are interested, and the link can provide the source and context of the data.", dont:{ caption:"Don't provide a chart image without any text description or data table   colorblind users and screen reader users will have no way to access the information the chart conveys." }, do:{ caption:"Do pair charts with a text summary that captures the key insight and a properly coded data table near the chart so users can access both the narrative and the exact data." } }
              ]
            }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"1.2 Time-based media",
          headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/time-based-media",
          intro:"Audio and video content needs to be accessible to users who can't see or hear it. Designers have more influence here than they might think. Planning for captions, transcripts, and audio descriptions at the start of a project means they actually get built. Leaving it to developers at the end means they probably don't.",
          criteria:[
            { title:"Include captions and transcripts", level:"A/AA", tags:["1.2.1: Audio-only and Video-only","1.2.2: Captions","1.2.3: Audio description"],
              noTitleLink: true,
              tagLinks:[
                { label:"1.2.1 - Audio-only and Video-only (Prerecorded)", url:"https://www.w3.org/WAI/WCAG22/Understanding/audio-only-and-video-only-prerecorded" },
                { label:"1.2.2 - Captions (Prerecorded)", url:"https://www.w3.org/WAI/WCAG22/Understanding/captions-prerecorded" },
                { label:"1.2.3 - Audio Description or Media Alternative (Prerecorded)", url:"https://www.w3.org/WAI/WCAG22/Understanding/audio-description-or-media-alternative-prerecorded" }
              ],
              body:"Any audio or video content needs a transcript, captions, or both. Users with hearing or vision disabilities can then access the content through reading or through a screen reader announcing the text alternative.",
              examplesIntro:"Here are 2 examples of the role that designers play in this guideline:",
              examples:[
                { title:"You're providing the content", desc:"Include button controls that let users toggle captions on and off, and/or download the transcript. Loop in the content team early so they can deliver the written content.", videoExample: true },
                { title:"You're designing a platform where others upload content", desc:"Make caption and transcript fields required. If you don't, people will skip them every time.", uploadExample: true },
              ]
            }
          ]
        }
      ]},
      { sections:[{ type:"guideline-detail",
        heading:"1.3 Adaptable",
        headingUrl:"https://www.w3.org/WAI/WCAG22/Understanding/adaptable",
        intro:"Content must be adaptable   presentable in different ways without losing information or structure. This ensures users relying on assistive technologies, custom stylesheets, or alternative viewing modes can still access all content.",
        criteria:[
          { title:"Make visual and auditory cues accessible", level:"A", tags:["1.3.1: Info and relationships"], body:"Ensure that visual cues like color, size, and layout are accessible to all users. Critical information conveyed through visual or auditory cues must also be described in text.", examples:[{ title:"Status icons", desc:"When conveying status (error, success, warning), pair color or iconography with a text label so the meaning is never lost.", dont:{ caption:"Don't use a red highlight alone to indicate a form error   users with color blindness won't know which fields have problems." }, do:{ caption:"Do pair color with a text label or icon so the status is clear regardless of how users perceive color." } }] },
          { title:"Order elements in a logical way", level:"A", tags:["1.3.2: Meaningful sequence"], body:"Think of the intended order of elements. Align with developers on the correct order of items so screen reader users understand the right order and context.", examples:[{ title:"Card reading order", desc:"The visual order of elements in a card must match the intended reading sequence in the underlying structure.", dont:{ caption:"Don't layer elements visually in a way that breaks logical reading order   screen readers read in markup order, not visual order." }, do:{ caption:"Do arrange content so the visual layout matches the intended reading sequence from top to bottom, left to right." } }] },
          { title:"Don't rely solely on sensory characteristics", level:"A", tags:["1.3.3: Sensory characteristics"], body:"Don't rely only on shape, color, size, visual location, orientation, or sound to convey meaning. Use clear instructions or labels that provide meaning to users.", examples:[{ title:"Directional instructions", desc:"Instructions like 'the button on the right' or 'the red section' fail for users who can't see the visual layout.", dont:{ caption:"Don't write 'click the green button below'   this relies on both color and position to identify the element." }, do:{ caption:"Do use explicit labels: 'Click the Save button' so instructions work regardless of visual presentation." } }] },
          { title:"Design for flexible screen orientation", level:"AA", tags:["1.3.4: Orientation"], body:"Make sure your website or app works in both portrait and landscape modes. Only restrict orientation if absolutely necessary.", examples:[{ title:"Orientation lock", desc:"Locking a UI to a single orientation blocks users who have mounted or fixed their device in a specific position.", dont:{ caption:"Don't force portrait-only layout   users who mount their device in landscape (e.g., wheelchair users) cannot rotate it." }, do:{ caption:"Do support both orientations and test layouts in both modes so content is accessible regardless of device position." } }] },
          { title:"Make form completion easier", level:"AA", tags:["1.3.5: Identify input purpose"], body:"Improve form accessibility by using clear, concise labels and implementing autofill. Offer real-time validation with clear error messages.", examples:[{ title:"Autofill support", desc:"Input fields should declare their purpose so browsers and assistive technologies can offer autofill and labeling support.", dont:{ caption:"Don't suppress autocomplete or use generic input labels   users with cognitive disabilities rely on autofill to reduce memory load." }, do:{ caption:"Do use semantic input types and autocomplete attributes so browsers can assist users in filling common fields like name, email, and address." } }] }
        ]
      }]},
      { sections:[{ type:"guideline-detail",
        heading:"Distinguishable",
        intro:"Content must be distinguishable   easy to see and hear. This guideline covers the sensory presentation of content, including color contrast, text sizing, and the handling of audio and visual presentation.",
        criteria:[
          { title:"Avoid color dependency", level:"A", tags:["1.4.1: Use of color"], body:"Don't rely solely on color to convey information. Add visual cues that help users distinguish the difference between elements.", examples:[{ title:"Selected state indicator", desc:"A selected tab or filter should not rely only on a color change to communicate selection.", dont:{ caption:"Don't indicate selection using color change alone   users with color vision deficiency may not perceive the difference." }, do:{ caption:"Do pair the color change with a visual indicator like a bold border, underline, or filled background shape." } }] },
          { title:"Respect small text: 4.5:1 contrast ratio", level:"AA", tags:["1.4.3: Contrast (minimum)"], body:"Small text needs to pass the 4.5:1 color contrast ratio. Bold text = 13pt and below. Regular text = 17pt and below.", examples:[{ title:"Body text on colored background", desc:"Text on branded or colored backgrounds must still meet contrast requirements even when the color is part of the brand palette.", dont:{ caption:"Don't place light gray text on a white background   even if it looks elegant, it fails the 4.5:1 contrast requirement." }, do:{ caption:"Do verify text color combinations with a contrast checker and adjust until the 4.5:1 ratio is met." } }] },
          { title:"Respect large text: 3:1 contrast ratio", level:"AA", tags:["1.4.3: Contrast (minimum)"], body:"Large text needs to pass the 3:1 color contrast ratio. Bold text = 14pt and up. Regular text = 18pt and up.", examples:[{ title:"Hero section heading", desc:"Large display headings still require a minimum 3:1 contrast ratio against their background.", dont:{ caption:"Don't assume large text automatically passes   light-on-light or dark-on-dark combinations still fail." }, do:{ caption:"Do check large text contrast independently and confirm it meets the 3:1 ratio." } }] },
          { title:"Support scalable UI", level:"AA", tags:["1.4.4: Resize text"], body:"Make sure your UI can adapt when users increase or decrease font sizes on their browsers or devices.", examples:[{ title:"Text at 200% zoom", desc:"When browser font size is increased to 200%, all content must remain readable and functional.", dont:{ caption:"Don't use fixed pixel containers that prevent text from scaling   content becomes unreadable for users who need larger fonts." }, do:{ caption:"Do test at 200% browser zoom and confirm no content is clipped, overlapping, or inaccessible." } }] },
          { title:"Ensure accessible content reflow", level:"AA", tags:["1.4.10: Reflow"], body:"Design content that can be enlarged up to 400% without requiring horizontal scrolling.", examples:[{ title:"Responsive zoom layout", desc:"At 400% zoom, a single-column linear layout should emerge naturally from the responsive design.", dont:{ caption:"Don't use fixed-width layouts that force horizontal scrolling at high zoom   this creates a significant barrier for low-vision users." }, do:{ caption:"Do design mobile-first responsive layouts that reflow to a single column, ensuring all content is accessible at 400% zoom." } }] },
          { title:"Respect non-text elements contrast ratio", level:"AA", tags:["1.4.11: Non-text contrast"], body:"For every actionable or critical element make sure there is enough contrast (3:1) for it to be easily distinguishable.", examples:[{ title:"Input field border", desc:"The border or outline of a form input must have sufficient contrast against its background to be clearly visible.", dont:{ caption:"Don't use a light gray border on a white background for inputs   the boundary becomes invisible to users with low contrast sensitivity." }, do:{ caption:"Do ensure input borders, icons, and UI component boundaries meet a 3:1 contrast ratio against adjacent colors." } }] },
          { title:"Allow users to adjust text spacing", level:"AA", tags:["1.4.12: Text spacing"], body:"Ensure that increased line, word, or letter spacing doesn't break the layout or hide content.", examples:[{ title:"Text spacing override", desc:"When users apply custom text spacing via a browser extension or accessibility setting, no content should be cut off.", dont:{ caption:"Don't use fixed-height containers around text   when users increase line height, text overflows and gets clipped." }, do:{ caption:"Do use min-height or let containers grow with content so text remains visible when spacing is increased." } }] },
          { title:"Design accessible hover and focus content", level:"AA", tags:["1.4.13: Content on hover or focus"], body:"Hover-triggered or focus-triggered content like tooltips must be dismissable, hoverable, and persistent.", examples:[{ title:"Tooltip behavior", desc:"A tooltip triggered by hovering over an icon must be dismissable, remain visible when hovered, and persist until dismissed.", dont:{ caption:"Don't build tooltips that disappear immediately when the cursor moves slightly   users with motor impairments can't keep the hover steady." }, do:{ caption:"Do keep tooltip content visible as long as the cursor is within the trigger area, and allow dismissal with the Escape key." } }] }
        ]
      }]}
    ],
    quiz:[
      { question:"Which WCAG principle covers making sure all images have text alternatives?", options:["Operable","Perceivable","Understandable","Robust"], answer:1, explanation:"Perceivable means all content must be presentable to users in ways they can perceive, including providing text alternatives for non-text content like images (1.1.1)." },
      { question:"A designer uses a red border alone to highlight a selected state in a filter component. Which WCAG success criteria does this most directly violate?", options:["1.3.4: Screen orientation must support both portrait and landscape modes","1.4.3: Text must meet a 4.5:1 contrast ratio","1.4.1: Information must not be conveyed through color alone","1.3.2: Elements must be ordered in a logical, meaningful sequence"], answer:2, explanation:"WCAG 1.4.1 states that color cannot be the only visual means of conveying information. A user with color vision deficiency may not perceive the red border as a selected state at all. The fix is to pair color with an additional visual cue, such as an icon, label, or change in shape, so the meaning is communicated through more than one channel." },
      { question:"A user zooms their browser to 400% to read your interface more comfortably. The content breaks into multiple columns and requires horizontal scrolling to navigate. Which success criteria has been violated?", options:["1.4.10: Content must reflow up to 400% without requiring horizontal scrolling","1.4.12: Text spacing must be adjustable without breaking the layout","1.3.3: Instructions must not rely on sensory characteristics like size or location","1.4.4: The UI must support scalable font sizes across browsers and devices"], answer:0, explanation:"WCAG 1.4.10 requires that content can be enlarged up to 400% without forcing users to scroll in two directions. Horizontal scrolling at high zoom levels creates a significant barrier for users with low vision. Designing with flexible, single-column reflow in mind ensures the experience remains navigable no matter how a user needs to scale it." }
    ]
  },
  { id:3, title:"WCAG principles | Operable", emoji:"⌨️",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"Operable Guidelines",
          href:"https://www.w3.org/TR/WCAG22/#operable",
          intro:["This principle ensures that all users can interact with your interface, regardless of how they navigate. Whether someone uses a keyboard, switch device, voice control, or touch, every function must be reachable and operable. There are 5 guidelines to follow and in the next pages, we will explain how you can design with these guidelines in mind:"],
          cards:[
            { title:"Keyboard accessible", desc:"All functionality must be operable through a keyboard interface without requiring specific timing." },
            { title:"Enough time",         desc:"Users must be given enough time to read and interact with content." },
            { title:"Seizures and physical reactions", desc:"Content must not be designed in a way that is known to cause seizures or physical reactions." },
            { title:"Navigable",           desc:"Users must be able to navigate, find content, and determine where they are." },
            { title:"Input modalities",    desc:"Users must be able to operate functionality through various input methods beyond keyboard and mouse." }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Keyboard accessible",
          intro:"All functionality must be operable through a keyboard interface. Users who cannot use a mouse rely entirely on keyboard navigation   this includes people using switch access, voice control, or screen readers.",
          criteria:[
            { title:"Allow users to exit a situation", level:"A", tags:["2.1.2: No keyboard trap"], body:"Enable users to easily get out of a situation by providing a clear closing option. Users should never become stuck inside a modal, dropdown, or interactive widget with no way out.", examples:[{ title:"Keyboard trap in a modal", desc:"A modal dialog that traps keyboard focus must always provide a way to dismiss it without using a mouse.", dont:{ caption:"Don't open a modal with no close button or Escape key handling   keyboard users become trapped inside with no way out." }, do:{ caption:"Do include a visible close button and support the Escape key so keyboard users can always dismiss the modal and return focus to the trigger." } }] },
            { title:"Ensure accessibility in shortcuts", level:"A", tags:["2.1.4: Character key shortcuts"], body:"Provide users the option to disable or customize keyboard shortcuts. Make shortcuts context-dependent and offer clear feedback with undo options.", examples:[{ title:"Single-key shortcut conflict", desc:"A single-character shortcut like 'S' can fire accidentally for a screen reader user navigating by typing letters to jump to elements.", dont:{ caption:"Don't implement single-character keyboard shortcuts without providing a way to disable or remap them   voice control users may trigger them unintentionally." }, do:{ caption:"Do offer a settings option to turn off or remap single-character shortcuts, or scope them so they only activate when focus is on the relevant component." } }] }
          ]
        },
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Enough time",
          intro:"Users must be given enough time to read and interact with content. Time limits can create barriers for users who read slowly, have motor impairments, or use assistive technologies that require more time to operate.",
          criteria:[
            { title:"Extend time-dependent functionalities", level:"A", tags:["2.2.1: Timing adjustable"], body:"If you have time-dependent content (e.g. security tokens), users should see the time remaining and have an option to extend it.", examples:[{ title:"Session timeout warning", desc:"When a session is about to expire, users must be warned in advance and given the option to extend it.", dont:{ caption:"Don't silently expire a session without warning   screen reader users or slow typists may lose their progress without ever knowing a timer was running." }, do:{ caption:"Do show a timeout warning at least 20 seconds before expiry and provide a clearly labeled option to extend the session." } }] },
            { title:"Include option to turn off automatic updates", level:"A", tags:["2.2.2: Pause, stop, hide"], body:"If you have content that moves or updates automatically, users need to have an option to pause, hide or stop this movement.", examples:[{ title:"Auto-advancing carousel", desc:"A banner that cycles through slides automatically must provide controls for users to pause or stop the movement.", dont:{ caption:"Don't auto-advance a carousel with no pause control   users with cognitive disabilities or those using screen readers need time to read each slide before it changes." }, do:{ caption:"Do include a pause button on any auto-advancing content so users can stop movement and review the content at their own pace." } }] }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Seizures and physical reactions",
          intro:"Designs must avoid content that could trigger physical reactions. Flashing or strobing visuals can provoke seizures in people with photosensitive epilepsy   even a single page visit can cause harm.",
          criteria:[
            { title:"Reduce blinking and flashing elements", level:"A", tags:["2.3.1: Three flashes or below threshold"], body:"Avoid using flashing elements that may provoke seizures. If you use flashing elements, make sure the flash rate is 3 times per second or less.", examples:[{ title:"Attention-grabbing animation", desc:"Rapid flashing or strobing effects used for emphasis are a direct risk to users with photosensitive epilepsy.", dont:{ caption:"Don't use rapid flashing animations to draw attention   content that flashes more than 3 times per second can trigger seizures." }, do:{ caption:"Do use subtle, slow transitions or static emphasis instead of flashing. If animation is necessary, keep it below 3 flashes per second and cover less than 25% of the viewport." } }] }
          ]
        },
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Navigable",
          intro:"Users must be able to navigate, find content, and determine where they are. Good navigation structure helps everyone   and is essential for keyboard users, screen reader users, and people with cognitive disabilities.",
          criteria:[
            { title:"Skip repetitive content blocks", level:"A", tags:["2.4.1: Bypass blocks"], body:"Have an option to skip repetitive content that repeats on every page so screen reader users can bypass those blocks to get to the main content.", examples:[{ title:"Skip navigation link", desc:"A 'Skip to main content' link at the top of each page lets keyboard users bypass repeated navigation menus.", dont:{ caption:"Don't force keyboard users to tab through a 12-item navigation menu and cookie banner on every single page before reaching the main content." }, do:{ caption:"Do add a visually hidden 'Skip to main content' link as the first focusable element so keyboard users can jump straight to the page content." } }] },
            { title:"Include a page title", level:"A", tags:["2.4.2: Page titled"], body:"Ensure all pages and screens have a title that accurately represents the content the user is viewing.", examples:[{ title:"Unique page titles", desc:"Each page or screen must have a distinct, descriptive title so users always know where they are.", dont:{ caption:"Don't use the same generic title like 'My App' on every page   screen reader users announce the page title on load and rely on it for orientation." }, do:{ caption:"Do write descriptive, unique titles for every page using the pattern 'Page name   App name' so context is immediately clear." } }] },
            { title:"Define focus states and their order", level:"AA", tags:["2.4.3: Focus order","2.4.7: Focus visible","2.4.11: Focus not obscured"], body:"Define focus states for actionable elements and work with developers on the focus order. Keep focused elements visible and avoid obstruction by modals or toolbars.", examples:[{ title:"Sticky header obscuring focus", desc:"A sticky navigation bar or floating toolbar can overlap the focused element, making it invisible to keyboard users.", dont:{ caption:"Don't let a sticky header cover the focused element   keyboard users lose track of where they are on the page." }, do:{ caption:"Do account for sticky elements in layout and ensure focused items always remain fully visible, never obscured by fixed UI." } }] },
            { title:"Ensure the purpose of a link or button is clear", level:"A", tags:["2.4.4: Link purpose (in context)"], body:"Avoid ambiguous links or buttons. Be more descriptive so that the purpose could be understood by the text alone.", examples:[{ title:"Generic 'Read more' links", desc:"Multiple 'Read more' links on a page all sound identical to a screen reader user scanning links out of context.", dont:{ caption:"Don't label multiple links 'Read more' or 'Click here'   screen reader users navigating by links hear a list of meaningless identical text." }, do:{ caption:"Do write descriptive link text that identifies the destination or action: 'Read the WCAG 2.2 overview' communicates purpose without surrounding context." } }] },
            { title:"Design for diverse navigation methods", level:"AA", tags:["2.4.5: Multiple ways"], body:"Ensure your app offers multiple ways to access content: a search bar, a categorical navigation menu, and quick-access files.", examples:[{ title:"Search plus structured navigation", desc:"Users should be able to reach any content through at least two routes   such as a navigation menu and a search bar.", dont:{ caption:"Don't rely on a single navigation path to access all content   users with cognitive disabilities or those lost in a hierarchy benefit from search as an alternative route." }, do:{ caption:"Do provide both structured navigation (menus, categories) and a search function so users can find content using whichever method works best for them." } }] },
            { title:"Group content for better screen reader navigation", level:"AA", tags:["2.4.6: Headings and labels"], body:"Aim to have distinctive groups of items, where each group has its own heading. Mark non-visual headings in your design file.", examples:[{ title:"Annotating semantic headings", desc:"Headings that look visually large but are marked as divs in code provide no navigation landmarks for screen readers.", dont:{ caption:"Don't use Display text styles on divs without annotating the intended heading level   developers will implement plain text and screen reader users lose all heading structure." }, do:{ caption:"Do annotate every section heading in your design file with its semantic level (H1–H6) so developers implement the correct hierarchy for screen reader navigation." } }] }
          ]
        }
      ]},
      { sections:[
        { type:"guideline-detail",
          heading:"Input modalities",
          intro:"Users must be able to interact with content through a variety of input methods beyond keyboard and mouse   including touch, voice, and switch controls. Designs must not assume a specific input device.",
          criteria:[
            { title:"Simplify touchscreen gestures", level:"A", tags:["2.5.1: Pointer gestures"], body:"All touchscreen functions should be operated with simple, single-point gestures like taps or clicks, instead of complex multi-touch gestures.", examples:[{ title:"Swipe to dismiss with no tap alternative", desc:"A swipe-to-dismiss gesture for notifications is not accessible to users who cannot perform multi-directional gestures.", dont:{ caption:"Don't make swipe the only way to dismiss or interact with an element   users with motor impairments who use single-tap switch access have no alternative." }, do:{ caption:"Do always provide a tap-based alternative alongside any swipe or complex gesture so all users can access the same functionality." } }] },
            { title:"Align labels and controls", level:"A", tags:["2.5.3: Label in name"], body:"Ensure that the visible text on buttons, links, and inputs matches the programmatic names used by assistive technologies.", examples:[{ title:"Icon button with mismatched label", desc:"A button that visually reads 'Search' but has an aria-label of 'Open query field' creates a mismatch that breaks voice control.", dont:{ caption:"Don't give a control a different accessible name than its visible label   voice control users say what they see, and a mismatch means the command won't trigger." }, do:{ caption:"Do ensure the accessible name starts with or exactly matches the visible label text so voice control users can activate any control by speaking what they read." } }] },
            { title:"Avoid drag-only actions", level:"AA", tags:["2.5.7: Dragging movements"], body:"Provide alternatives to dragging actions. Offer simple, single-pointer options like clicks or taps to help users with mobility impairments.", examples:[{ title:"Drag-to-reorder list", desc:"A list that can only be reordered by dragging is inaccessible to users who cannot perform a sustained click-and-drag motion.", dont:{ caption:"Don't make drag the only way to reorder, resize, or move elements   users with motor impairments or tremors cannot reliably perform a sustained drag." }, do:{ caption:"Do provide a single-tap or click-based alternative for any drag interaction, such as arrow buttons to reorder list items or handles with keyboard support." } }] },
            { title:"Ensure touch-target area is big enough", level:"AA", tags:["2.5.8: Target size (minimum)"], body:"Aim to have at least 48px width and 48px height for touch targets. Ensure clickable elements are separated by 8px or more.", examples:[{ title:"Small icon buttons in a toolbar", desc:"Toolbar icons that are 20×20px have a visual footprint too small for reliable tapping, especially for users with motor impairments.", dont:{ caption:"Don't use 20px or 24px tap targets for icon buttons   they are too small for users with reduced motor control to reliably hit, causing mis-taps." }, do:{ caption:"Do set a minimum 48×48px tap target for all interactive elements, even when the visual icon is smaller. Use padding to expand the hit area without changing the visual design." } }] }
          ]
        }
      ]}
    ],
    quiz:[
      { question:"What is the minimum recommended touch target size for interactive elements?", options:["24x24px","32x32px","44x44px","48x48px"], answer:3, explanation:"The recommended minimum touch target is 48x48px. Even for smaller visual elements like icons, the tap area should still be 48x48px." },
      { question:"A mobile app requires users to perform a two-finger swipe to dismiss a notification. A user with limited hand mobility cannot complete this gesture. Which success criteria does this violate?", options:["2.2.2: Automatically moving content must have a pause or stop option","2.4.4: The purpose of all links and buttons must be clear from their text alone","2.5.1: All touchscreen functions must be operable with simple single-point gestures","2.5.3: Visible labels must match the programmatic name used by assistive technologies"], answer:2, explanation:"WCAG 2.5.1 requires that all functionality operated through touch can be performed with a single-point gesture (a tap or click) rather than complex multi-touch or path-based gestures. Multi-finger swipes create a significant barrier for users with motor impairments. The fix is to always provide a simple, single-tap alternative alongside any complex gesture." },
      { question:"A screen reader user lands on a page and must tab through a 12-item navigation menu and a cookie banner on every single page before reaching the main content. Which success criteria does this most directly violate?", options:["2.4.2: Every page must have a title that accurately describes its content","2.3.1: Flashing elements must not exceed 3 times per second","2.4.6: Content should be grouped with distinctive headings for easier navigation","2.4.1: Users must have a way to skip repetitive content blocks on every page"], answer:3, explanation:"WCAG 2.4.1 exists specifically to address this experience. When repetitive elements like navigation menus appear on every page, screen reader users are forced to tab through all of them every single time before reaching the content they actually came for. A \"skip to main content\" link at the top of the page solves this. It's invisible to sighted users but gives keyboard and screen reader users an immediate escape route to the content that matters." }
    ]
  },
  { id:4, title:"WCAG principles | Understandable", emoji:"💬",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"Understandable Guidelines",
          href:"https://www.w3.org/TR/WCAG22/#understandable",
          intro:["This principle ensures that information and the operation of the interface is understandable. Content must be readable, interfaces must behave predictably, and users must be helped to avoid and correct mistakes. There are 3 guidelines to follow and in the next pages, we will explain how you can design with these guidelines in mind:"],
          cards:[
            { title:"Readable",          desc:"Content must be readable and understandable, with language attributes that assistive technologies can use." },
            { title:"Predictable",       desc:"Web pages must appear and operate in predictable ways so users always know what to expect." },
            { title:"Input assistance",  desc:"Users must be helped to avoid and correct mistakes when providing input." }
          ]
        }
      ]},
      { sections:[{ type:"guideline-detail",
        heading:"Readable",
        intro:"Content must be readable and understandable to all users. This includes setting language attributes that assistive technologies rely on, and writing in plain language that reduces cognitive load.",
        criteria:[
          { title:"Present language selection upfront", level:"A", tags:["3.1.1: Language of page","3.1.2: Language of parts"], body:"If your product supports multiple languages, make sure language selection is presented upfront before the user can continue interacting.", examples:[{ title:"Language selection on first use", desc:"If content is available in multiple languages, the language selection must be one of the first interactions   not buried in settings.", dont:{ caption:"Don't default to a single language without offering a selection screen   screen readers use the page language to determine pronunciation, and wrong language settings produce garbled output." }, do:{ caption:"Do present a clear language selector on first load or onboarding so users can set their preferred language before engaging with any content." } }] },
          { title:"Simplify content", level:"AAA", tags:["3.1.5: Reading level"], body:"Use simple sentences and communicate in a conversational tone. By using simple sentence formulation, content is understood faster and more easily.", examples:[{ title:"Plain language in error messages", desc:"Error messages written in technical jargon are inaccessible to users with lower reading levels or cognitive disabilities.", dont:{ caption:"Don't write error messages like 'An unhandled exception occurred during form validation'   most users cannot parse technical language under stress." }, do:{ caption:"Do write error messages in plain language: 'Your password must be at least 8 characters' tells users exactly what to fix without requiring technical knowledge." } }] }
        ]
      }]},
      { sections:[{ type:"guideline-detail",
        heading:"Predictable",
        intro:"Interfaces must behave in ways users expect. Unexpected context changes, inconsistent navigation, and unpredictable component behavior all create barriers   especially for users with cognitive disabilities or those relying on screen readers.",
        criteria:[
          { title:"Don't change context without user confirmation", level:"A", tags:["3.2.1: On focus","3.2.2: On input"], body:"Context of the page shouldn't be changed without user confirming it. Before any change happens, there needs to be a clear question and an option the user can choose from.", examples:[{ title:"Auto-submitting dropdown", desc:"A dropdown that immediately navigates to a new page the moment an option is selected creates an unexpected context change.", dont:{ caption:"Don't trigger a page navigation or form submission automatically when a user selects a dropdown option   this disorients screen reader users who are still exploring." }, do:{ caption:"Do require a separate confirm action (like a 'Go' button) after a selection so users can review their choice and consciously trigger the change." } }] },
          { title:"Make navigation predictable and consistent", level:"AA", tags:["3.2.3: Consistent navigation"], body:"Ensure consistent navigation across all pages by placing menus, buttons, and repeated elements in the same order.", examples:[{ title:"Navigation order across screens", desc:"If the search icon appears after the profile icon on one screen, it should appear in the same position on all screens.", dont:{ caption:"Don't reorder navigation items or move global controls between screens   users with cognitive disabilities build mental maps that break when layout is inconsistent." }, do:{ caption:"Do maintain the same visual and focus order for all recurring navigation elements across every screen in your product." } }] },
          { title:"Stay consistent for improved accessibility", level:"AA", tags:["3.2.4: Consistent identification"], body:"Create a style guide with standardized labels and text alternatives for similar functions. Use clear, uniform language.", examples:[{ title:"Submit button label consistency", desc:"Calling the same action 'Submit', 'Send', and 'Confirm' on different forms confuses users who expect consistent labeling.", dont:{ caption:"Don't use different labels for the same function across your product   inconsistency forces users to re-evaluate familiar patterns each time." }, do:{ caption:"Do define a vocabulary in your design system: one label per function, applied consistently everywhere, so users immediately recognize familiar controls." } }] },
          { title:"Keep help options consistent across your design", level:"A", tags:["3.2.6: Consistent help"], body:"Ensure that help options such as contact links, chatbots, or support pages are consistently positioned in your design.", examples:[{ title:"Help link position across pages", desc:"A 'Contact support' link that appears in the footer on some pages and in the header on others is harder to find in a moment of need.", dont:{ caption:"Don't move help resources to different locations between pages   users who need help are already under cognitive load and shouldn't have to search for it." }, do:{ caption:"Do place help options (chat, support link, FAQ) in the same position on every page so users can find assistance predictably without additional effort." } }] }
        ]
      }]},
      { sections:[{ type:"guideline-detail",
        heading:"Input assistance",
        intro:"Users must be helped to avoid and correct mistakes. Error prevention and clear guidance are especially important for users with cognitive disabilities, learning differences, or motor impairments who may find correcting errors difficult.",
        criteria:[
          { title:"Clearly identify errors", level:"A", tags:["3.3.1: Error identification","3.3.3: Error suggestion"], body:"Clearly indicate where and what type of error took place. Focus the element in question, provide an error text next to it and describe what the issue is.", examples:[{ title:"Form validation error", desc:"An error must be described in text, not indicated by color alone, and should suggest how to correct it.", dont:{ caption:"Don't use a red border alone to mark an invalid field   users with color vision deficiency won't perceive the error, and screen reader users won't hear it." }, do:{ caption:"Do add an error message directly below the invalid field explaining what went wrong: 'Email address is required' tells users exactly what to correct." } }] },
          { title:"Provide labels and cues to avoid mistakes", level:"A", tags:["3.3.2: Labels or instructions"], body:"Avoid user mistakes by adding simple instructions or cues so users understand what is asked of them. Always use visible labels.", examples:[{ title:"Visible input labels", desc:"Placeholder text inside an input field disappears when typing, leaving users with no label to reference if they forget what is expected.", dont:{ caption:"Don't rely on placeholder text as the only label for an input   it disappears on focus, leaving users with cognitive disabilities no reference while they type." }, do:{ caption:"Do use a persistent, visible label above every input field so users always know what information is expected, even while they are typing." } }] },
          { title:"Enable review and confirmation to prevent mistakes", level:"AA", tags:["3.3.4: Error prevention"], body:"When designing interfaces that involve legal or financial information, provide clear instructions and offer confirmation dialogues before finalizing transactions.", examples:[{ title:"Checkout confirmation step", desc:"A payment flow must give users an opportunity to review their order before it is submitted.", dont:{ caption:"Don't finalize a purchase or irreversible action with a single tap   users with motor impairments may activate it accidentally with no recovery path." }, do:{ caption:"Do include a review and confirm step before any irreversible action, especially for financial, legal, or data-deletion flows." } }] },
          { title:"Avoid redundant entries in multi-step processes", level:"A", tags:["3.3.7: Redundant entry"], body:"Avoid asking users to re-enter the same information within the same session. Auto-fill information or provide options to reuse previously entered data.", examples:[{ title:"Pre-filled billing address", desc:"A checkout flow that asks for shipping address and then asks for billing address should offer to copy the shipping address.", dont:{ caption:"Don't ask users to re-type their address on the billing screen after they already entered it for shipping   every extra entry is a barrier for users with motor or cognitive disabilities." }, do:{ caption:"Do offer a 'Same as shipping address' checkbox so users can reuse information they already provided without re-entering it." } }] },
          { title:"Provide accessible authentication options", level:"AA", tags:["3.3.8: Accessible authentication (minimum)"], body:"For authentication always provide alternative identification methods, both biometric and non-biometric. Authentication should not require cognitive function tests like recalling passwords.", examples:[{ title:"Login without memorization", desc:"A login screen that requires only a typed password excludes users who cannot reliably recall or type complex strings.", dont:{ caption:"Don't make password recall the only login method   cognitive disabilities, memory conditions, and motor impairments all make password entry unreliable." }, do:{ caption:"Do offer alternatives like passkeys, magic links, biometric login, or copy-paste-friendly OTPs so authentication doesn't rely on a user's ability to recall and type from memory." } }] }
        ]
      }]}
    ],
    quiz:[
      { question:"A form shows a red border on invalid fields but no error text. What's the accessibility problem?", options:["The red color may not meet contrast requirements","It relies on color alone and doesn't clearly identify the error","The border width is too thin","There is no problem"], answer:1, explanation:"WCAG 3.3.1 requires that errors be described in text, not just indicated with color. Users with color vision deficiency won't perceive the red border without accompanying text." },
      { question:"A user is completing a multi-step checkout form and is asked to re-enter their shipping address on the payment screen, even though they entered it two steps earlier. Which guideline does this violate?", options:["3.3.7: Users must not be asked to re-enter information already provided in the same session","3.2.3: Navigation must be consistent and predictable across all pages","3.3.1: Errors must be clearly identified and described","3.3.4: Confirmation dialogues must be provided before finalizing transactions"], answer:0, explanation:"WCAG 3.3.7 exists to reduce cognitive load and friction in multi-step processes. Asking users to re-enter information they have already provided is redundant and creates unnecessary barriers, especially for users with cognitive disabilities or motor impairments for whom typing is effortful. The solution is to auto-populate known information or offer the user a clear option to reuse it." },
      { question:"A banking app automatically redirects users to a different page the moment they select a dropdown option, without any confirmation. Which WCAG guideline does this most directly violate?", options:["3.1.2: Language changes within a page must be programmatically identified","3.3.2: Visible labels must be provided to help users avoid mistakes","3.2.4: Labels and functions must be consistent across the product","3.2.2: Context must not change automatically without user confirmation"], answer:3, explanation:"WCAG 3.2.2 requires that changing a UI component (like selecting a dropdown value) does not automatically trigger a context change such as a page redirect unless the user has been clearly informed this will happen. Unexpected context changes disorient all users, but are especially disruptive for screen reader users and people with cognitive disabilities who rely on predictable, controlled interactions to navigate confidently." }
    ]
  },
  { id:5, title:"WCAG principles | Robust", emoji:"🔧",
    pages:[
      { sections:[
        { type:"guideline-cards",
          heading:"Robust Guidelines",
          href:"https://www.w3.org/TR/WCAG22/#robust",
          intro:["This principle ensures that content is robust enough to be interpreted by a wide variety of current and future technologies, including assistive tools. Every interactive element must expose its name, role, and value so screen readers, voice control, and switch access can all operate it reliably. There is 1 guideline to follow and in the next pages, we will explain how you can design with this guideline in mind:"],
          cards:[
            { title:"Compatible", desc:"Content must be robust enough to be reliably interpreted by a wide variety of assistive technologies." }
          ]
        }
      ]},
      { sections:[{ type:"guideline-detail",
      heading:"Compatible",
      intro:"Content must be robust enough to be interpreted by a wide variety of current and future assistive technologies. This means every interactive element must expose its name, role, and value so that screen readers, voice control, and switch access can all operate it reliably.",
      criteria:[
        { title:"Avoid being platform-specific", level:"A", tags:["4.1.2: Name, role, value"], body:"Users who use assistive technologies may not be able to tap or click to perform a function. Every interactive element must have a programmatically determinable name, role, and value.", examples:[{ title:"Icon-only button", desc:"A button that only contains an icon has no visible text label. Without an accessible name, screen readers announce it as 'button' with no context.", dont:{ caption:"Don't spec an icon-only button without annotating an accessible name   screen reader users will hear 'button' with no indication of what it does." }, do:{ caption:"Do annotate every icon-only button in your design handoff with an explicit accessible name (e.g., aria-label: 'Close dialog') so developers can implement it correctly." } }] }
      ]
    }]}],
    quiz:{ question:"A designer specifies a button that triggers an action only through a tap gesture, with no alternative interaction method documented for developers. Which user group is most directly impacted and why?", options:["Users with visual impairments: they cannot see the button on screen","Users with hearing impairments: audio feedback from the button is inaccessible","Users relying on assistive technologies: they may not be able to tap or click to trigger the action","Users on mobile devices: tap gestures are inconsistent across operating systems"], answer:2, explanation:"WCAG 4.1.2 falls under the Robust principle. Content must be built to work across the widest range of technologies, not just the most common input method. When a function is designed exclusively around a tap or click, users who rely on voice control, switch access, or other assistive technologies may have no way to trigger it at all. Robust design means communicating interactions in a way that can be interpreted and executed beyond a single platform or input type." }
  },
  { id:6, title:"Accessibility in Figma", emoji:"✏️",
    pages:[
      { sections:[
        { type:"text", heading:"Your role starts in the file", body:"Accessibility decisions made in Figma, or skipped there, directly affect what gets built. The earlier accessibility is considered, the cheaper and faster it is to fix." },
        { type:"plugin-cards", heading:"Essential Figma plugins", plugins:[
          { name:"Able",                icon:"🔍", use:"Contrast checker that works inline as you design. Essential for color decisions." },
          { name:"A11y Annotation Kit", icon:"🏷️", use:"Official annotation library for adding accessibility specs to handoff files." },
          { name:"Stark",               icon:"⚡", use:"Full a11y suite: contrast, vision simulator, focus order, and alt text." },
          { name:"Color Blind",         icon:"👁️", use:"Simulates 8 types of color vision deficiency across your entire frame." }
        ]}
      ]},
      { sections:[
        { type:"annotation-guide", heading:"Annotating for handoff", body:"When you hand off designs, developers need more than visual specs. Include these accessibility annotations in every handoff:", items:[
          { icon:"🏷️", label:"Reading order",    desc:"Number elements in the intended focus/reading sequence" },
          { icon:"🖼️", label:"Alt text",          desc:"Write descriptive alt text for all meaningful images; mark decorative images" },
          { icon:"🎯", label:"Interactive role",  desc:"Label components: button, link, checkbox, radio, etc." },
          { icon:"⌨️", label:"Keyboard behavior", desc:"Note expected keyboard interactions (Enter to confirm, Esc to close, etc.)" },
          { icon:"🔊", label:"ARIA labels",        desc:"Specify accessible names for icon-only buttons and unlabeled inputs" }
        ]},
        { type:"naming-guide", heading:"Layer naming matters", body:"Semantic layer names in Figma improve communication with developers. Follow these conventions:", rules:[
          { do:"Button/Primary/Default",       dont:"Rectangle 12" },
          { do:"Icon/ArrowRight (decorative)",  dont:"arrow-icon-2-final" },
          { do:"Heading/Display500",           dont:"text copy here" },
          { do:"Input/Email/Error",            dont:"group 47" }
        ]}
      ]}
    ],
    quiz:{ question:"When handing off an icon-only button to a developer, what accessibility annotation is most important?", options:["The button's exact pixel dimensions","An accessible name / ARIA label for the button's purpose","The icon's source file location","The hover color state"], answer:1, explanation:"Icon-only buttons have no visible text label, so developers need an accessible name to communicate the button's purpose to screen reader users. This is a WCAG 4.1.2 requirement." }
  },
  { id:7, title:"Design system & Storybook", emoji:"🧩",
    pages:[
      { sections:[
        { type:"text", heading:"Accessibility is built in, but it's your job to use it correctly", body:"Our design system components are built to be accessible out of the box. But they can still be misused in ways that break accessibility." },
        { type:"storybook-guide", heading:"Using Storybook for accessibility", body:"Every component in our Storybook includes an Accessibility tab powered by the axe-core engine. Before handing off a new pattern:", steps:[
          { num:"01", title:"Find the component",                desc:"Locate the closest matching component in Storybook before designing a custom solution." },
          { num:"02", title:"Check the Accessibility tab",       desc:"Review any existing violations or warnings. These are known issues the team is tracking." },
          { num:"03", title:"Read the usage docs",               desc:"Each component has a Usage story with do/don't guidance, including a11y-specific notes." },
          { num:"04", title:"Propose changes through the system", desc:"If a component doesn't meet a new accessibility need, open a design system ticket, don't one-off it." }
        ]}
      ]},
      { sections:[{ type:"do-dont", heading:"Common misuses to avoid", pairs:[
        { dont:"Using a div styled as a button in your design spec",            do:"Using the Button component from the system, which includes keyboard and ARIA support" },
        { dont:"Creating a custom dropdown from scratch for a one-off use case", do:"Using the Select or Combobox component, which has focus management built in" },
        { dont:"Removing the visible label from an input to save space",        do:"Using the Input component with a visible label or proper aria-label annotation" },
        { dont:"Using a Display style on a div with no semantic note",          do:"Annotating the semantic heading level (H1-H6) separately from the visual Display style" }
      ]}]}
    ],
    quiz:{ question:"A component in Storybook has a flagged accessibility violation. What should you do?", options:["Ignore it, Storybook flags too many false positives","Design around it with a custom one-off component","Check the team's known issues and open a design system ticket if it's a new gap","Ask a developer to suppress the warning"], answer:2, explanation:"Known violations in Storybook are tracked by the team. The right move is to check if it's already logged, and if it's a new gap, raise it through the design system process." }
  },
  { id:8, title:"Your role & checklist", emoji:"✅",
    pages:[
      { sections:[
        { type:"text", heading:"Accessibility is everyone's responsibility, but designers set the tone", body:"By the time a design reaches engineering, most of the accessibility decisions have already been made. That means your choices in Figma have an outsized impact on the final product's inclusivity." },
        { type:"checklist-module", heading:"Designer accessibility checklist", categories:[
          { name:"Color & visual",       items:["All text meets 4.5:1 contrast ratio (3:1 for large text)","UI components (inputs, buttons, icons) meet 3:1 contrast","Color is never the sole means of conveying information","Designs reviewed under color blindness simulation"] },
          { name:"Typography & layout",  items:["Body text is Body 300 (16px) minimum","Touch/click targets are at least 48x48px","Content reflows at 400% zoom without horizontal scrolling","Text spacing can be increased without loss of functionality"] },
          { name:"Interaction & states", items:["All interactive elements have a visible focus state","Hover, focus, active, disabled, and error states are designed","Keyboard interaction annotated for complex components","Motion can be disabled (prefers-reduced-motion considered)"] },
          { name:"Handoff",              items:["Reading/focus order annotated in Figma","Alt text written for all meaningful images","ARIA labels specified for icon-only controls","Interactive element roles labeled (button, link, checkbox...)"] }
        ]}
      ]},
      { sections:[{ type:"resources", heading:"Keep learning", links:[
        { title:"WCAG 2.2 Quick Reference", url:"https://www.w3.org/WAI/WCAG22/quickref/",       desc:"Official filterable checklist from W3C" },
        { title:"WebAIM Contrast Checker",  url:"https://webaim.org/resources/contrastchecker/", desc:"Quick ratio checker for any two colors" },
        { title:"Inclusive Components",     url:"https://inclusive-components.design/",           desc:"Deep dives on designing common UI patterns accessibly" },
        { title:"A11y Project Checklist",   url:"https://www.a11yproject.com/checklist/",         desc:"Practical, plain-language WCAG checklist" }
      ]}]}
    ],
    quiz:{ question:"At what stage of the design process does accessibility have the most impact?", options:["During QA testing before launch","During developer implementation","During design, before handoff","After the first accessibility audit"], answer:2, explanation:"Accessibility issues found during design cost the least to fix. Once code is written, retrofitting accessibility is significantly more expensive and time-consuming." }
  }
];

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [active,     setActive]     = useState(null);
  const [completed,  setCompleted]  = useState([]);
  const [showQuiz,   setShowQuiz]   = useState(false);
  const [quizDone,   setQuizDone]   = useState(false);
  const [allDone,    setAllDone]    = useState(false);
  const [page,       setPage]       = useState(0);
  const [attempt,    setAttempt]    = useState(0);
  const [started,    setStarted]    = useState([]);
  const [showInfo,   setShowInfo]   = useState(true);

  const moduleHeadingRef = useRef(null);

  // Move focus to module heading when a module opens
  useEffect(() => {
    if (active && moduleHeadingRef.current) {
      moduleHeadingRef.current.focus();
    }
  }, [active]);

  function openModule(m) {
    if (!completed.includes(m.id) && !started.includes(m.id)) {
      setStarted(prev => prev.concat([m.id]));
    }
    setActive(m);
    setShowQuiz(false);
    setQuizDone(false);
    setPage(0);
    setAttempt(prev => prev + 1);
    window.scrollTo(0, 0);
  }

  function finishQuiz() {
    const next = completed.includes(active.id) ? completed : completed.concat([active.id]);
    setCompleted(next);
    if (next.length === MODULES.length) setAllDone(true);
    setQuizDone(true);
  }

  function goNext() {
    window.scrollTo(0, 0);
    const lastPage = active && page === active.pages.length - 1;
    if (lastPage) { setShowQuiz(true); } else { setPage(p => p + 1); }
  }

  function goPrev() {
    window.scrollTo(0, 0);
    if (showQuiz) { setShowQuiz(false); } else { setPage(p => p - 1); }
  }

  // ── All done ──────────────────────────────────────────────────────────────
  if (allDone) return (
    <><GlobalFont /><AllDoneWrapper>
      <AllDoneCard>
        <AllDoneEmoji aria-hidden="true">🎉</AllDoneEmoji>
        <AllDoneTitle>Training complete!</AllDoneTitle>
        <AllDoneBody>
          You have completed all {MODULES.length} modules of the Haven accessibility training.
        </AllDoneBody>
        <Button
          styleType="PrimaryDefault"
          onClick={() => { setAllDone(false); setActive(null); }}
        >
          Back to dashboard
        </Button>
      </AllDoneCard>
    </AllDoneWrapper></>
  );

  // ── Module reader ─────────────────────────────────────────────────────────
  if (active) {
    const acc        = MODULE_COLORS[active.id];
    const pages      = active.pages;
    const totalPages = pages.length;
    const curPage    = pages[page];
    const isLastPage = page === totalPages - 1;
    const headerTitle = active.headerTitle || active.title;
    const prevModule  = MODULES[active.id - 1];
    const nextModule  = MODULES[active.id + 1];
    const isReadOnly  = completed.includes(active.id) && !quizDone;

    const isDone    = completed.includes(active.id);
    const isStarted = started.includes(active.id);
    let headerTagColor, headerStatusLabel;
    if (isDone)         { headerTagColor = "greenSubtle";  headerStatusLabel = "Completed"; }
    else if (isStarted) { headerTagColor = "purpleSubtle"; headerStatusLabel = "In progress"; }
    else                { headerTagColor = "yellowSubtle"; headerStatusLabel = "Ready to start"; }
    // Show post-quiz nav when: quiz just completed, OR revisiting completed module on quiz page
    const showPostQuizNav = quizDone || (showQuiz && isReadOnly);

    return (
      <><GlobalFont /><ReaderWrapper>
        <ModuleNavBar>
          <ModuleNavLeft>
            <Link
              as="button"
              reverse
              onClick={() => setActive(null)}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontWeight: rdcUiTheme.typography.weight.medium, fontFamily: FONT, background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: rdcUiTheme.color.text.primaryReverse, textDecoration: 'underline', textUnderlineOffset: 3 }}
            >
              <IconChevronLeft size={2} aria-hidden="true" />
              Back to dashboard
            </Link>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }}>
              <ModuleImageBox style={{ flexShrink: 0 }}>
                <img src={MODULE_IMAGES[active.id]} alt="" aria-hidden="true" />
              </ModuleImageBox>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <NavBarLabel style={{ margin: 0 }}>Module {active.id + 1} of {MODULES.length}</NavBarLabel>
                  <Tag dataColor={headerTagColor} style={{ fontFamily: FONT, whiteSpace: 'nowrap' }}>
                    {headerStatusLabel}
                  </Tag>
                </div>
                <NavBarTitle ref={moduleHeadingRef} tabIndex={-1}>
                  {headerTitle}
                </NavBarTitle>
              </div>
            </div>
          </ModuleNavLeft>
          <ModuleNavRight>
            <ModuleNavIllustration
              src={COVER_IMG}
              alt=""
              onError={e => { e.target.style.display = "none"; }}
            />
          </ModuleNavRight>
        </ModuleNavBar>

        <ReaderMain id="main-content">

          {/* ── REVISIT MODE: all content on one page ── */}
          {isReadOnly ? (
            <>
              <h2 style={{ fontFamily: FONT, fontWeight: 500, fontSize: rdcUiTheme.typography.scale.body400.size, lineHeight: rdcUiTheme.typography.scale.body400.lineHeight, color: rdcUiTheme.color.text.secondary, margin: '0 0 32px' }}>Module recap</h2>
              {pages.map((p, pi) => (
                <ContentCard key={pi}>
                  {p.sections.map((s, si) => (
                    <Section key={si} section={s} acc={acc} isReadOnly={true} />
                  ))}
                </ContentCard>
              ))}
              <QuizBlock
                key={active.id + "-" + attempt}
                quiz={active.quiz}
                attempt={attempt}
                onComplete={finishQuiz}
                isReadOnly={isReadOnly}
              />
              <NavRow>
                <div>
                  {prevModule ? (
                    <Button styleType="SecondaryDefault" onClick={() => openModule(prevModule)}>
                      Previous module recap
                    </Button>
                  ) : (
                    <Button styleType="SecondaryDefault" onClick={() => setActive(null)}>
                      Back to dashboard
                    </Button>
                  )}
                </div>
                {nextModule && (
                  <Button styleType="PrimaryDefault" onClick={() => openModule(nextModule)}>
                    {completed.includes(nextModule.id) ? "Next module recap" : "Next module"}
                  </Button>
                )}
              </NavRow>
            </>
          ) : (
            <>
              <StepIndicator total={totalPages + 1} current={showQuiz || quizDone ? totalPages : page} />

              {/* Page content */}
              {!showQuiz && !quizDone && (
                <ContentCard>
                  {curPage.sections.map((s, i) => (
                    <Section key={i} section={s} acc={acc} isReadOnly={false} />
                  ))}
                </ContentCard>
              )}

              {/* Quiz   key forces remount between modules/attempts */}
              {showQuiz && (
                <QuizBlock
                  key={active.id + "-" + attempt}
                  quiz={active.quiz}
                  attempt={attempt}
                  onComplete={finishQuiz}
                  isReadOnly={false}
                  prevButton={
                    <Button styleType="SecondaryDefault" onClick={goPrev}>Previous page</Button>
                  }
                />
              )}

              {/* Module complete card */}
              {quizDone && (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, textAlign: 'center', marginTop: 32 }}>
                  <h2 style={{ fontFamily: FONT, fontSize: 24, fontWeight: 600, color: rdcUiTheme.color.text.primary, margin: 0 }}>
                    Module complete!
                  </h2>
                  <p style={{ fontFamily: FONT, fontSize: rdcUiTheme.typography.scale.body300.size, lineHeight: 1.6, color: rdcUiTheme.color.text.secondary, margin: 0 }}>
                    What do you want to do next?
                  </p>
                </div>
              )}

              {/* Navigation   in-progress */}
              {!showPostQuizNav && !showQuiz && (
                <NavRow>
                  <div>
                    {page > 0 ? (
                      <Button styleType="SecondaryDefault" onClick={goPrev}>
                        Previous page
                      </Button>
                    ) : prevModule ? (
                      <Button styleType="SecondaryDefault" onClick={() => openModule(prevModule)}>
                        {completed.includes(prevModule.id) ? "Previous module recap" : "Previous module"}
                      </Button>
                    ) : (
                      <Button styleType="SecondaryDefault" onClick={() => setActive(null)}>
                        Back to dashboard
                      </Button>
                    )}
                  </div>
                  <NavRight>
                    <Button styleType="PrimaryDefault" onClick={goNext}>
                      {isLastPage ? "Take the knowledge check" : "Next page"}
                    </Button>
                  </NavRight>
                </NavRow>
              )}

              {/* Navigation   post quiz */}
              {showPostQuizNav && (
                <NavRow>
                  <Button
                    styleType="SecondaryDefault"
                    onClick={() => { setQuizDone(false); setPage(0); window.scrollTo(0, 0); }}
                  >
                    View module recap
                  </Button>
                  {nextModule ? (
                    <Button styleType="PrimaryDefault" onClick={() => openModule(nextModule)}>
                      {completed.includes(nextModule.id) ? "Next module recap" : "Next module"}
                    </Button>
                  ) : (
                    <Button
                      styleType="PrimaryDefault"
                      onClick={() => { setActive(null); window.scrollTo(0, 0); }}
                    >
                      Finish training
                    </Button>
                  )}
                </NavRow>
              )}
            </>
          )}
        </ReaderMain>
      </ReaderWrapper></>
    );
  }

  // ── Dashboard ─────────────────────────────────────────────────────────────
  return (
    <><GlobalFont /><PageWrapper>
      <HeroHeader>
        <HeroLeft>
          <HeroLogoWrap>
            <HavenLogo height={28} />
          </HeroLogoWrap>
          <div>
            <HeroTitle>
              Accessibility training for designers
            </HeroTitle>
            <HeroSubtitle>
              An interactive training experience for designers focused on integrating
              accessibility principles into their design practice.
            </HeroSubtitle>
          </div>
          <HeroTagRow>
            <HeroPill>
              <IconSchool size={2} color={rdcUiTheme.color.text.primary} aria-hidden="true" />
              {MODULES.length} modules
            </HeroPill>
            <HeroMetaDot aria-hidden="true">·</HeroMetaDot>
            <HeroPill>
              <IconClock size={2} color={rdcUiTheme.color.text.primary} aria-hidden="true" />
              ~60 min
            </HeroPill>
          </HeroTagRow>
        </HeroLeft>
        <HeroRight>
          <HeroIllustration
            src={COVER_IMG}
            alt=""
            onError={e => { e.target.style.display = "none"; }}
          />
        </HeroRight>
      </HeroHeader>

      <DashMain id="main-content">


        {/* Progress */}
        <div>
        <ProgressSection>
          <ProgressLabelRow>
            <span>{completed.length} out of {MODULES.length} modules completed</span>
            <span>{Math.round((completed.length / MODULES.length) * 100)}%</span>
          </ProgressLabelRow>
          <ProgressMeter
            id="dashboard-progress"
            value={Math.round((completed.length / MODULES.length) * 100)}
          />
        </ProgressSection>

        {/* Module grid */}
        <ModuleGrid>
          {MODULES.map((mod, i) => {
            const isDone     = completed.includes(mod.id);
            const isUnlocked = true;
            const isStarted  = !isDone && started.includes(mod.id);
            const isLocked   = !isUnlocked;

            let tagColor, statusLabel;
            if (isDone)         { tagColor = "greenSubtle";  statusLabel = "Completed"; }
            else if (isLocked)  { tagColor = "graySubtle";   statusLabel = "Locked"; }
            else if (isStarted) { tagColor = "purpleSubtle"; statusLabel = "In progress"; }
            else                { tagColor = "yellowSubtle"; statusLabel = "Ready to start"; }

            const card = (
              <ModuleCardBtn
                $locked={isLocked}
                aria-disabled={isLocked ? "true" : undefined}
                aria-label={
                  isLocked
                    ? `Module ${i + 1} is locked. Please finish module ${i} to start this one.`
                    : undefined
                }
                onClick={() => { if (isUnlocked) openModule(mod); }}
              >
                <ModuleImageBox>
                  <img src={MODULE_IMAGES[i]} alt="" aria-hidden="true" />
                </ModuleImageBox>
                <CardContent>
                  <CardTopRow>
                    <CardModuleNum>Module {i + 1}</CardModuleNum>
                    <Tag dataColor={tagColor} style={{ whiteSpace: 'nowrap', fontFamily: FONT }}>
                      {statusLabel}
                    </Tag>
                  </CardTopRow>
                  <CardTitle>{mod.headerTitle || mod.title}</CardTitle>
                </CardContent>
              </ModuleCardBtn>
            );

            return (
              <div key={mod.id}>
                {isLocked ? (
                  <LockedTooltipWrapper>
                    <LockedTooltipBubble data-tooltip>
                      <LockedTooltipTitle>{`Module ${i + 1} is locked`}</LockedTooltipTitle>
                      <LockedTooltipBody>{`Please finish module ${i} to start this one.`}</LockedTooltipBody>
                    </LockedTooltipBubble>
                    {card}
                  </LockedTooltipWrapper>
                ) : card}
              </div>
            );
          })}
        </ModuleGrid>
        </div>
      </DashMain>
    </PageWrapper></>
  );
}
