import ReactGA4 from 'react-ga4';
const InitializeGoogleAnalytics = () => {
  const TRAKCING_ID = process.env.GA_TRACKING_ID as string;
  ReactGA4.initialize(TRAKCING_ID);
  console.log('GA INITIALIZED');
};

const TrackGoogleAnalyticsEvent = (
  category: string,
  action: string,
  label: string
) => {
  console.log('GA event:', category, ':', action, ':', label);
  // Send GA4 Event
  ReactGA4.event({
    category: category,
    action: action,
    label: label,
  });
};

export default InitializeGoogleAnalytics;
export { InitializeGoogleAnalytics, TrackGoogleAnalyticsEvent };
