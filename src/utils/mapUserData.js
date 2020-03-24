// map the cognito user data to our dynamodb user schema
export default (user) => {
  const mappedPayload = {
    pid: user.sub,
    first_name: user.name,
    phone: user.phone_number,
    is_seeking: user['custom:is_seeking'],
    last_name: user.family_name,
    email_address: user.email,
    medical_history: '',
    current_prescription: '',
    preferences: '',
    health_care_plan: '',
  }

  return mappedPayload
}
