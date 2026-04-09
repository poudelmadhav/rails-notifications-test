class PostMailer < ApplicationMailer
  def new_post
    @post = params[:record]
    mail(to: params[:recipient].email, subject: "New Post: #{@post.title}")
  end
end
