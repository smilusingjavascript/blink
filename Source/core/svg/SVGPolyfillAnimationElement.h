// Copyright 2014 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

#ifndef SVGPolyfillAnimationElement_h
#define SVGPolyfillAnimationElement_h

#include "core/svg/SVGElement.h"

namespace blink {

class SVGPolyfillAnimationElement : public SVGElement {
    DEFINE_WRAPPERTYPEINFO();
protected:
    SVGPolyfillAnimationElement(const QualifiedName&, Document&);
};

} // namespace blink

#endif // SVGPolyfillAnimationElement_h
