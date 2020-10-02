<div class="header__main">
    <a href="index.php" class="logo">Mia's Blog</a>
    <nav class="navbar">
        <ul class="navbar__nav">
            <li class="navbar__item"><a href="list.php?page=1" class="navbar__link">文章列表</a></li>
            <li class="navbar__item"><a href="" class="navbar__link">分類專區</a></li>
            <li class="navbar__item"><a href="" class="navbar__link">關於我</a></li>
        </ul>
    </nav>
</div>
<div>
    <div class="controlbar">
        <ul class="controlbar__nav">
            <?php if (!empty($_SESSION['username'])) { ?>
                <li class="navbar__item"><a href="admin.php" class="controlbar__link">管理後台</a></li>
                <li class="navbar__item"><a href="post.php" class="controlbar__link">新增文章</a></li>
                <li class="navbar__item"><a href="logout.php" class="controlbar__link">登出</a></li>
            <?php	} else {?>
                <li class="controlbar__item"><a href="login.php" class="controlbar__link">登入</a></li>
            <?php	}?>
        </ul>
    </div>
</div>
