import { NativeModules } from 'react-native';
import type { components } from '@credify/api-docs';

type PushClaimCB = (localId: string, credifyId: string) => void;

type ServicexSdkRnType = {
  getOfferList(payload: UserPayload): Promise<string>;
  showOfferDetail(id: string, pushClaimCB: PushClaimCB): void;
  setCredifyId(id: string): void;
  setUserProfile(payload: UserPayload): void;
  setPushClaimRequestStatus(isSuccess: boolean): void;
  showReferral(): void;
  clearCache(): void;
  initialize(apiKey: string, environment: string, marketName: string): void;
};

type OfferListRes = {
  credifyId: string;
  offerList: OfferData[];
};

export type OfferData = components['OfferData'] & {
  evaluationResult?: components['EvaluationResult'];
};

export type UserPayload = { [key: string]: string };

const ServicexSdkNative = NativeModules.ServicexSdkRn as ServicexSdkRnType;

export function init() {}

export async function getOffers(payload: UserPayload): Promise<OfferListRes> {
  try {
    const jsonString = await ServicexSdkNative.getOfferList(payload);
    const offerRes: OfferListRes = JSON.parse(jsonString);
    return offerRes;
  } catch (error) {
    throw error;
  }
}

export function clearCache() {
  ServicexSdkNative.clearCache();
}

export function showOfferDetail(id: string, pushClaimCB: PushClaimCB) {
  ServicexSdkNative.showOfferDetail(id, pushClaimCB);
}

export function showReferralResult() {
  ServicexSdkNative.showReferral();
}

export function setCredifyId(id: string) {
  ServicexSdkNative.setCredifyId(id);
}

export function setUserProfile(payload: UserPayload) {
  ServicexSdkNative.setUserProfile(payload);
}

export function setPushClaimRequestStatus(isSuccess: boolean) {
  ServicexSdkNative.setPushClaimRequestStatus(isSuccess);
}

export function initialize(
  apiKey: string,
  environment: string,
  marketName: string
) {
  ServicexSdkNative.initialize(apiKey, environment, marketName);
}

const ServiceXSdk = {
  init,
  getOffers,
  showOfferDetail,
  setUserProfile,
  setCredifyId,
  setPushClaimRequestStatus,
  showReferralResult,
  initialize,
  clearCache,
};

export default ServiceXSdk;
