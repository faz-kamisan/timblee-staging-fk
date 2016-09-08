class CommentsController < ApplicationController

  skip_before_action :authenticate_user!, only: [:create]
  before_action :fetch_user_or_guest, only: [:create]

  def create
    @comment = @commenter.comments.build(comment_params)
    if @comment.save
      render json: @comment.as_json, status: 200
    else
      render json: t('.failure', scope: :flash) , status: 522
    end
  end

  private
    def comment_params
      params.require(:comment).permit(:message, :commentable_id, :commentable_type)
    end

    def fetch_user_or_guest
      unless @commenter = current_user || current_guest
        redirect_to root_path
      end
    end
end
