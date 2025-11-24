import { ref } from "vue";
import { defineStore } from "pinia";
import { PLANS_TEMPLATE } from "@/stores/payment/constants.ts";
import type { IPaymentPlan } from "@/components/payment/types.ts";
import { externalApi } from "@/api/api.ts";
import { useAudioPlayer } from "@/composables/audioPlayer/audioPlayer.ts";

export const usePaymentStore = defineStore("payment", () => {
  const { downloadTrack } = useAudioPlayer();

  const currentSelectedPlan = ref<IPaymentPlan>(PLANS_TEMPLATE.MEDIUM);

  const title = ref<string>(PLANS_TEMPLATE.MEDIUM.title);
  const amount = ref<number>(PLANS_TEMPLATE.MEDIUM.amount);
  const tokens = ref<number>(PLANS_TEMPLATE.MEDIUM.tokens);

  const currentPageName = ref<string>("home");

  const setCurrentActivePage = (toName: string) => {
    currentPageName.value = toName ?? "home";
  };

  const setData = (plan: IPaymentPlan) => {
    title.value = plan.title;
    amount.value = plan.amount;
    tokens.value = plan.tokens;
  };

  const setPlan = (plan: IPaymentPlan) => {
    currentSelectedPlan.value = plan;
    setData(plan);
  };

  const setNewPayment = async () => {
    const { data, isSuccess, fetching } = externalApi.setNewPayment();

    await fetching({
      amount: amount.value,
      return_uri: "http://82.202.137.174/profile",
    });

    console.log("ССЫЛКА ПЛАТЕЖ", data);

    if (isSuccess.value && data.value) {
      window.open(data.value, "_blank");
    }
  };

  const buyCurrentSample = async (sampleId: string) => {
    const {
      data: purchasedTrack,
      isSuccess: isPurchased,
      fetching: purchase,
    } = externalApi.buyTheSample(sampleId);

    await purchase();

    if (isPurchased.value && purchasedTrack.value) {
      await downloadTrack(purchasedTrack.value.sample);
    }
  };

  return {
    currentSelectedPlan,
    title,
    amount,
    tokens,

    setNewPayment,
    setCurrentActivePage,
    setPlan,
    buyCurrentSample,
  };
});
