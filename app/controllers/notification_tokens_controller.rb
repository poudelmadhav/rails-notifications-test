class NotificationTokensController < ApplicationController
  before_action :set_user

  def create
    @token = @user.notification_tokens.find_or_create_by!(notification_token_params)
    redirect_to @user, notice: "Token registered successfully"
  end

  def destroy
    @token = @user.notification_tokens.find(params[:id])
    @token.destroy!
    redirect_to @user, notice: "Token removed"
  end

  private

  def set_user
    @user = User.find(params[:user_id])
  end

  def notification_token_params
    params.expect(notification_token: [ :token, :platform ])
  end
end
