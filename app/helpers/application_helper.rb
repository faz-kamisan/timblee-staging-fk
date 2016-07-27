module ApplicationHelper
  def folder_line_item(folder)
    ('<li class="folder-info" data-id=' + folder.id.to_s + '>' + link_to(image_tag('cross.png'), folder_path(folder), method: :delete, remote: true, class: "delete-folder") + '</a> <a href="javascript:void(0);">' + image_tag('more-icon.png', class: 'folder-icon') + '<span class="folder-name">' + folder.name + '</span> <span class="folder-items">' + folder.site_maps.count.to_s + '</span> </a></li>').html_safe
  end
end
